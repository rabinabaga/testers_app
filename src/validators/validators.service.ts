import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Model } from 'mongoose';
import { ModuleRef } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly moduleRef: ModuleRef) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    if (!value) return true; // Skip validation if value is empty
    console.log('ModuleRef exists:', !!this.moduleRef);
    const [modelName, field] = args.constraints as [string, string];
    console.log(modelName, field);

    try {
      // Get the model using the token
      const modelToken = getModelToken(modelName);
      const model: Model<any> = this.moduleRef.get(modelToken, {
        strict: false,
      });

      if (!model) {
        console.error(
          `Model ${modelName} not found. Make sure it's registered in MongooseModule.forFeature()`,
        );
        return false;
      }

      // Build query
      const query: any = { [field]: value };

      // Exclude current document if updating (id should be in the object being validated)
      const currentId = (args.object as any).id || (args.object as any)._id;
      if (currentId) {
        query._id = { $ne: currentId };
      }

      const existing = await model.findOne(query).exec();
      return !existing;
    } catch (error) {
      console.error('IsUnique validation error:', error);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const [, field] = args.constraints;
    return `${field} must be unique`;
  }
}

// Decorator function
export function IsUnique(
  modelName: string,
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [modelName, field],
      validator: IsUniqueConstraint,
    });
  };
}

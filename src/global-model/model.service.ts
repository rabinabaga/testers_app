// model.service.ts
import { Injectable, Global } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Global()
@Injectable()
export class ModelService {
  private modelMap: Map<string, Model<any>> = new Map();

  constructor(
    @InjectModel('User') private userModel: Model<any>,
    @InjectModel('Project') private projectModel: Model<any>,
    // Add more models as needed
  ) {}

  onModuleInit() {
    // Register all models
    this.modelMap.set('User', this.userModel);
    this.modelMap.set('Project', this.projectModel);
    // Add more models as needed
  }

  getModel(modelName: string): Model<any> {
    const model = this.modelMap.get(modelName);
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    return model;
  }

  // Optional: Add methods to access specific models directly
  getUserModel(): Model<any> {
    return this.userModel;
  }

  getProjectModel(): Model<any> {
    return this.projectModel;
  }
}

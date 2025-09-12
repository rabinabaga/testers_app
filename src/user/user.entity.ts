import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getFormattedDate } from 'src/common/helpers/data_format.helper';
import { TargetApp } from 'src/target-app/entities/target-app.entity';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, enum: ['TESTER', 'DEVELOPER'] })
  role: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('targetApps', {
  ref: TargetApp.name,
  localField: '_id',
  foreignField: 'submittedBy',
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret: any) => {
    delete ret.password;
    ((ret.id = ret._id), delete ret._id);
    return {
      object: 'user',
      targetApps: ret.targetApps,
      ...ret,
    };
  },
});

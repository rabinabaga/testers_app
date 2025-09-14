import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class TargetApp extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  link: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  submittedBy: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TargetAppSchema = SchemaFactory.createForClass(TargetApp);

TargetAppSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ((ret.id = ret._id), delete ret._id);
    return {
      object: 'targetApp',
      ...ret,
    };
  },
});

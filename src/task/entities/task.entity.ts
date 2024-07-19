import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TYPE_STATUS {
  CREATE = 'create',
  PENDIND = 'pending',
  COMPLETE = 'complete',
}

export enum TYPE_PRIORITY {
  LOW = 'low',
  MEDUIM = 'meduim',
  HIGH = 'high',
}

export type Priority = {
  id: number;
  label: TYPE_PRIORITY;
  title: string;
  tag: string;
};

export type Status = {
  id: number;
  label: TYPE_STATUS;
  title: string;
  tag: string;
};

@Schema({
  id: true,
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(_: any, ret: any) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret._v;
    },
  },
})
export class Task {
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ type: Object, required: true })
  status: Status;

  @Prop({ type: Object, required: true })
  priority: Priority;

  @Prop({ required: false })
  assign?: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
export type TaskDocument = Document & Task;

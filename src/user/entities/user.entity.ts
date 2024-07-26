import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ROLE {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

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
export class User {
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: ROLE;

  @Prop({ required: false })
  profile?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = Document & User;

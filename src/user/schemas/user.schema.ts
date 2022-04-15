import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop({ required: true })
  @Prop()
  email: string;

  @Prop({ required: true })
  @Prop()
  password: string;

  @Prop({ required: true })
  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animes } from '../../animes/schemas/animes.schema';
import { User } from 'src/users/schemas/user.schema';

export type AnimesListDocument = HydratedDocument<AnimesList>;

@Schema({ timestamps: true })
export class AnimesList {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animes' }] })
  animes_list?: Animes[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;
}

export const AnimesListSchema = SchemaFactory.createForClass(AnimesList);

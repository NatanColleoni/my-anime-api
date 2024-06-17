import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnimesDocument = HydratedDocument<Animes>;

@Schema()
export class Animes {
  @Prop({ unique: true })
  mal_id: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  picture: string;

  @Prop()
  num_episodes: number;

  @Prop()
  start_date: string;

  @Prop()
  rank: number;
}

export const AnimesSchema = SchemaFactory.createForClass(Animes);

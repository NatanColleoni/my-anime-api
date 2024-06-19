import { Module } from '@nestjs/common';
import { AnimesListService } from './animes-list.service';
import { AnimesListController } from './animes-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimesList, AnimesListSchema } from './schemas/animes-list.schema';
import { Animes, AnimesSchema } from 'src/animes/schemas/animes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AnimesList.name, schema: AnimesListSchema }]),
    MongooseModule.forFeature([{ name: Animes.name, schema: AnimesSchema }]),
  ],
  controllers: [AnimesListController],
  providers: [AnimesListService],
})
export class AnimesListModule {}

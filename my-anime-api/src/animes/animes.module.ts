import { Module } from '@nestjs/common';
import { AnimesService } from './animes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Animes, AnimesSchema } from './schemas/animes.schema';
import { HttpModule } from '@nestjs/axios';
import { AnimesController } from './animes.controller';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: Animes.name, schema: AnimesSchema }])],
  providers: [AnimesService],
  exports: [AnimesService],
  controllers: [AnimesController],
})
export class AnimesModule {}

import { Injectable } from '@nestjs/common';
import { Animes } from './schemas/animes.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterDto } from './dtos/filter.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AnimesService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Animes.name) private animesModel: Model<Animes>
  ) {}

  async listar(filter: FilterDto) {
    const animesDb = await this.getAnimesFromDatabase(filter);
    return animesDb;
  }

  async fetchFromMAL(filter: FilterDto) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${process.env.MAL_ROUTE}/anime?q=${filter.query}&limit=${filter.limit}&offset=${filter.offset}&fields=id,title,num_episodes,synopsis,rank,start_date`
      )
    );

    const axiosData = response.data;
    const { data } = axiosData;

    const mapObject = data.map(anime => {
      return {
        mal_id: anime.node.id,
        title: anime.node.title,
        description: anime.node.synopsis,
        num_episodes: anime.node.num_episodes,
        picture: anime.node.main_picture.large ?? anime.main_picture.medium,
        start_date: anime.node.start_date,
        rank: anime.node.rank,
      };
    });

    const existingAnimes = await this.getExistingAnimesIds();
    const newAnimes = mapObject.filter(anime => !existingAnimes.includes(anime.mal_id));

    if (newAnimes.length > 0) {
      await this.animesModel.insertMany(newAnimes);
    }
    return await this.getAnimesFromDatabase(filter);
  }

  async getAnimesFromDatabase(filter: FilterDto) {
    const animesDb = await this.animesModel
      .find({ title: { $regex: filter.query, $options: 'i' } })
      .lean()
      .sort({ rank: 'asc' })
      .skip(filter.offset)
      .limit(filter.limit);
    return animesDb;
  }

  async getExistingAnimesIds() {
    const animes = await this.animesModel.find({}, { mal_id: 1, _id: 0 });
    return animes.map(anime => anime.mal_id);
  }
}

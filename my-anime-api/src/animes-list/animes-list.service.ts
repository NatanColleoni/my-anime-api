import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AnimesList } from './schemas/animes-list.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnimesListDto } from './dtos/create-animes-list.dto';
import { UpdateAnimesListDto } from './dtos/update-animes-list.dto';
import { Animes, AnimesDocument } from 'src/animes/schemas/animes.schema';

@Injectable()
export class AnimesListService {
  constructor(
    @InjectModel(AnimesList.name) private animesListModel: Model<AnimesList>,
    @InjectModel(Animes.name) private readonly animesModel: Model<AnimesDocument>
  ) {}

  async create(createAnimesListDto: CreateAnimesListDto, userId: string): Promise<AnimesList> {
    const createdAnimesList = new this.animesListModel({
      ...createAnimesListDto,
      owner: userId,
    });
    return createdAnimesList.save();
  }

  async findAll(userId: string): Promise<AnimesList[]> {
    return this.animesListModel.find({ owner: userId }).populate('animes_list').exec();
  }

  async updateList(id: string, userId: string, updateAnimesListDto: UpdateAnimesListDto) {
    const animesList = await this.animesListModel.findById(id).exec();

    if (!animesList) {
      throw new NotFoundException();
    }

    if (animesList.owner.toString() !== userId) {
      throw new UnauthorizedException();
    }
    const animes = await this.animesModel
      .find({
        _id: { $in: updateAnimesListDto.animes_list },
      })
      .exec();
    animesList.animes_list = animes;
    return animesList.save();
  }
}

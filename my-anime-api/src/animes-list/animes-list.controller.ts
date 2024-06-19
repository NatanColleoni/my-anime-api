import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AnimesListService } from './animes-list.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAnimesListDto } from './dtos/create-animes-list.dto';
import { AnimesList } from './schemas/animes-list.schema';
import { UpdateAnimesListDto } from './dtos/update-animes-list.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('ANIMES-LIST')
@Controller('animes-list')
@UseGuards(AuthGuard)
export class AnimesListController {
  constructor(private readonly animesListService: AnimesListService) {}

  @Post()
  async create(@Body() createAnimesListDto: CreateAnimesListDto, @Req() req: Request): Promise<AnimesList> {
    const userId = req['user'].user_id;
    return this.animesListService.create(createAnimesListDto, userId);
  }

  @Get()
  async findAll(@Req() req: Request): Promise<AnimesList[]> {
    return this.animesListService.findAll(req['user'].user_id);
  }

  @Put(':id')
  async updateAnimesList(
    @Param('id') id: string,
    @Body() updatedAnimesListDto: UpdateAnimesListDto,
    @Req() req: Request
  ) {
    return this.animesListService.updateList(id, req['user'].user_id, updatedAnimesListDto);
  }
}

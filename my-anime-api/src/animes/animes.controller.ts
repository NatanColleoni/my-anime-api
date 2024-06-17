import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FilterDto } from './dtos/filter.dto';
import { AnimesService } from './animes.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('animes')
export class AnimesController {
  constructor(private service: AnimesService) {}

  @UseGuards(AuthGuard)
  @Get('listar')
  async listar(@Query() filter: FilterDto) {
    return await this.service.listar(filter);
  }

  @UseGuards(AuthGuard)
  @Get('fetch-mal-animes-list')
  async fetchMal(@Query() filter: FilterDto) {
    return await this.service.fetchFromMAL(filter);
  }
}

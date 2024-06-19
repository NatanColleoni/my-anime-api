import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FilterDto } from './dtos/filter.dto';
import { AnimesService } from './animes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('ANIMES')
@Controller('animes')
@UseGuards(AuthGuard)
export class AnimesController {
  constructor(private service: AnimesService) {}

  @Get('listar')
  async listar(@Query() filter: FilterDto) {
    return await this.service.listar(filter);
  }

  @Get('fetch-mal-animes-list')
  async fetchMal(@Query() filter: FilterDto) {
    return await this.service.fetchFromMAL(filter);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId } from 'class-validator';

export class UpdateAnimesListDto {
  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  animes_list: string[];
}

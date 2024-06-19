import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsString, IsMongoId } from 'class-validator';

export class CreateAnimesListDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  animes_list: string[];
}

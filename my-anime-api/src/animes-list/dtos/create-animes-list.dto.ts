import { IsNotEmpty, IsArray, IsString, IsMongoId } from 'class-validator';

export class CreateAnimesListDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  @IsMongoId({ each: true })
  animes_list: string[];
}

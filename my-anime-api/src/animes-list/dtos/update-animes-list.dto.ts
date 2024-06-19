import { IsArray, IsMongoId } from 'class-validator';

export class UpdateAnimesListDto {
  @IsArray()
  @IsMongoId({ each: true })
  animes_list: string[];
}

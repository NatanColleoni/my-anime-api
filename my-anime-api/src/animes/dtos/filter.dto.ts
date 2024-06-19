import { ApiProperty } from '@nestjs/swagger';

export class FilterDto {
  @ApiProperty()
  query: string;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  limit: number;
}

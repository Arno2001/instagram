import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SearchUsersDto {
  @ApiPropertyOptional()
  @IsOptional()
  search_user_name: string;
}

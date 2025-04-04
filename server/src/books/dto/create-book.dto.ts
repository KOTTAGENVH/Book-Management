/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsInt, Min, Max, Length } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  @Length(1, 100)
  author: string;

  @IsString()
  @Length(1, 50)
  genre: string;

  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  publicationYear: number;
}

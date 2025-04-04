import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    try {
      return await this.booksService.create(createBookDto);
    } catch (error) {
      console.log('Error creating book', error);
      throw new InternalServerErrorException('Error creating book');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.booksService.findAll();
    } catch (error) {
      console.log('Error retrieving books', error);
      throw new InternalServerErrorException('Error retrieving books');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.booksService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('Error retrieving book', error);
      throw new InternalServerErrorException('Error retrieving book');
    }
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    try {
      return await this.booksService.findByEmail(email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('Error retrieving book by email', error);
      throw new InternalServerErrorException('Error retrieving book by email');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      return await this.booksService.update(id, updateBookDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('Error updating book', error);
      throw new InternalServerErrorException('Error updating book');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.booksService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('Error deleting book', error);
      throw new InternalServerErrorException('Error deleting book');
    }
  }
}

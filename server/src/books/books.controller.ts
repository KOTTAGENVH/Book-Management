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
  Req,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Request } from 'express';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Req() req: Request) {
    try {
      const email = (req as Request & { email: string }).email;
      return await this.booksService.create({ ...createBookDto, email });
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

  @Get('/email')
  async findByEmail(@Req() req: Request) {
    try {
      const email = req.email;
      if (!email) {
        throw new NotFoundException('Email is required to find books');
      }
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
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Req() req: Request,
  ) {
    try {
      const email = (req as Request & { email?: string }).email;
      if (!email) {
        throw new NotFoundException('Email is required to update a book');
      }
      return await this.booksService.update(id, updateBookDto, email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('Error updating book', error);
      throw new InternalServerErrorException('Error updating book');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    try {
      const email = (req as Request & { email?: string }).email;
      if (!email) {
        throw new NotFoundException('Email is required to delete a book');
      }
      return await this.booksService.remove(id, email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('Error deleting book', error);
      throw new InternalServerErrorException('Error deleting book');
    }
  }
}

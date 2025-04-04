import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    try {
      return await this.prisma.book.create({ data: createBookDto });
    } catch (error) {
      console.log('Error creating book', error);
      throw new InternalServerErrorException('Error creating book');
    }
  }

  async findAll() {
    try {
      return await this.prisma.book.findMany();
    } catch (error) {
      console.log('Error finding books', error);
      throw new InternalServerErrorException('Error finding books');
    }
  }

  async findOne(id: string) {
    try {
      const book = await this.prisma.book.findUnique({ where: { id } });
      if (!book) throw new NotFoundException('Book not found');
      return book;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving book');
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      await this.findOne(id);
      return await this.prisma.book.update({
        where: { id },
        data: updateBookDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating book');
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      return await this.prisma.book.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error deleting book');
    }
  }

  async findByEmail(email: string) {
    try {
      const books = await this.prisma.book.findMany({ where: { email } });
      if (books.length === 0) {
        throw new NotFoundException(`No books found for email: ${email}`);
      }
      return books;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error fetching books by email');
    }
  }
}

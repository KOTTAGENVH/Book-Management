import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [BooksModule, PrismaModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'health', method: RequestMethod.GET },
        { path: '', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.modules';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot()
@Module({
  imports: [HttpModule, MoviesModule, MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


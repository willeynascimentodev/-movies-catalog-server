import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from "@nestjs/mongoose";
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieSchema } from './schemas/movie.schema';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema} ])],
  controllers: [MoviesController],
  providers: [MoviesService],
})

export class MoviesModule {}

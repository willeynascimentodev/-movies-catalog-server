import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Movie } from './interfaces/movies.interface';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService) {}

    @Get()
    async findAll(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<Movie> {
        return this.moviesService.findOne(id);
    }

    @Get('update/db')
    updateDB() {
        return this.moviesService.updateDB();
    }
    
}

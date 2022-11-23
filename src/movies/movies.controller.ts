import { Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Movie } from './interfaces/movies.interface';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService) {}

    @Get()
    async findAll(@Query('titulo') titulo: string, @Query('skip') skip: number, @Query('limit') limit: number): Promise<{}> {
        return this.moviesService.findAll(titulo, skip, limit);
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<Movie> {
        return await this.moviesService.findOne(id);
    }

    @Get('update/db')
    updateDB() {
        return this.moviesService.updateDB();
    }
    
}

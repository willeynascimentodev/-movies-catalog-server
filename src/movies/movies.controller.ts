import { Controller, Get, Param } from '@nestjs/common';
import { Movie } from './interfaces/movies.interface';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService) {}

    @Get()
    async findAll(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }
    
}

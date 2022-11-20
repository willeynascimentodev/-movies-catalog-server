import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService) {}

    @Get()
    findAll(): string {
        return this.moviesService.findAll();
    }

    @Get('updateDB')
    updateDB() {
        return this.moviesService.updateDB();
    }

    @Get(':id') 
    findOne(@Param('id') id) {
        return this.moviesService.findOne(id);
    }
    
}

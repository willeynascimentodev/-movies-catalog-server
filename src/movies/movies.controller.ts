import { Controller, Get } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    findAll(): string {
        return '';
    }
}

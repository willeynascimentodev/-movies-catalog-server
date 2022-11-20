import { HttpService } from "@nestjs/axios";
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { catchError, map } from 'rxjs';
import { Movie } from './interfaces/movies.interface';


@Injectable()
export class MoviesService {

    constructor(private http: HttpService, private movieModel: Model<Movie>) {}

    async updateDB() {
        return this.http
        .get('https://ghibliapi.herokuapp.com/films/')
        .pipe(
            map((movie) => {
              console.log(movie);
            }),
          )
        .pipe(
            catchError(() => {
                throw new ForbiddenException('API not available');
            }),
        );
    }

    async findAll(): Promise<Movie[]> {
        return await this.movieModel.find();
    }

    async findOne(id: string): Promise<Movie> {
        return await this.movieModel.findOne({ _id: id })
    }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { catchError, map } from 'rxjs';

@Injectable()
export class MoviesService {

    constructor(private http: HttpService) {}

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

    findAll(): any {

    }

    findOne(id: string): any {
        
    }
}

import { HttpService } from "@nestjs/axios";
import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { catchError, lastValueFrom, map } from 'rxjs';
import { Movie } from './interfaces/movies.interface';


@Injectable()
export class MoviesService {

    constructor(@InjectModel('Movie') private readonly movieModel: Model<Movie>, private http: HttpService) {}

    async updateDB(): Promise<Movie[]> {
        
        try {
            const result = await lastValueFrom(this.http
                .get('https://ghibliapi.herokuapp.com/films/')
                .pipe(
                    map(resp => resp.data),
                )
                .pipe(
                    catchError(() => {
                        throw new ForbiddenException('API not available');
                    }),
                ));
        
                result.map(async (item) => {
        
                    const obj = {
                        titulo: item.title,
                        banner: item.image,
                        descricao: item.description,
                        diretor: item.director,
                        produtor: item.producer,
                        ref: item.id,
                    }
        
                    const newItem = await this.movieModel.findOneAndUpdate({ ref: obj.ref }, obj, { new: true, upsert: true });
                
                });
            return this.findAll();
        } catch (error) {
            throw new InternalServerErrorException('Erro no servidor');
        }
        

    }

    async findAll(skip = 0, limit = null): Promise<Movie[]> {
        try {
            const movies = await this.movieModel.find().skip(skip).limit(limit);
            return movies;
        } catch (error) {
            throw new InternalServerErrorException('Erro no servidor'); 
        }
    }

    async findOne(id: string): Promise<Movie> {
        try {
            const movie = await this.movieModel.findOne({ _id: id });    
            return movie;
        } catch (error) {
            throw new NotFoundException('Filme não encontrado');    
        }
    }
}

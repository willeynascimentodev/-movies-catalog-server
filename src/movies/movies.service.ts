import { HttpService } from "@nestjs/axios";
import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { catchError, lastValueFrom, map } from 'rxjs';
import { Movie } from './interfaces/movies.interface';


@Injectable()
export class MoviesService {

    constructor(@InjectModel('Movie') private readonly movieModel: Model<Movie>, private http: HttpService) {}

    async countAll() {
        try {
            const movies = await this.movieModel.find().count();
            return movies;
        } catch (error) {
            throw new InternalServerErrorException('Erro no servidor'); 
        }
    }

    async updateDB(): Promise<{}> {
        
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
                
                return {
                    statusCode : 200,
                    message : "Success"
                }
            
        } catch (error) {
            throw new InternalServerErrorException('Erro no servidor');
        }
        

    }

    async findAll(titulo = '', skip = 0, limit = null): Promise<{}> {
        try {
            console.log(titulo);
            const movies = await this.movieModel.find({titulo: { '$regex' : titulo, '$options' : 'i' } }).skip(skip).limit(limit);
            const count = await this.movieModel.find({titulo: { '$regex' : titulo, '$options' : 'i' } }).count();
            return {
                total: count,
                movies: movies
            };
        } catch (error) {
            throw new InternalServerErrorException(error); 
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

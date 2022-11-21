import { HttpService } from "@nestjs/axios";
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { catchError, lastValueFrom, map } from 'rxjs';
import { Movie } from './interfaces/movies.interface';


@Injectable()
export class MoviesService {

    constructor(@InjectModel('Movie') private readonly movieModel: Model<Movie>, private http: HttpService) {}

    async updateDB(): Promise<Movie[]> {
        
    
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
    
            const registros = (await this.findAll()).length;
            console.log(registros);
    
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

    }

    async findAll(): Promise<Movie[]> {
        return await this.movieModel.find();
    }

    async findOne(id: string): Promise<Movie> {
        return await this.movieModel.findOne({ _id: id })
    }
}

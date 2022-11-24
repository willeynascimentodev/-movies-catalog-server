import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

const all = {
    'total' : 3,
    'movies' : [
      {
        _id: '1', titulo: 'Título 1', banner: 'Banner 1', descricao: 'Desc 1', diretor: 'Diretor 1', produtor: 'Produtor 1',
      },
      {
        _id: '2', titulo: 'Título 2', banner: 'Banner 2', descricao: 'Desc 2', diretor: 'Diretor 2', produtor: 'Produtor 2',
      },
      {
        _id: '3', titulo: 'Título 3', banner: 'Banner 3', descricao: 'Desc 3', diretor: 'Diretor 3', produtor: 'Produtor 3',
      }
    ]
}



describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(all.movies[0]),
            findAll: jest.fn().mockResolvedValue(all),
            updateDB: jest.fn(),
          }
        }
      ]
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('all', () => {
    it(('should return a movies list entity'), async () => {
      const result = await controller.findAll('', 0, 0);
      expect(result).toEqual(all);
    })

    it(('should return a movies list entity pag 2 per page: 2'), async () => {
      const result = await controller.findAll('', 2, 2);
      expect(result).toEqual(all);
    })
  });

  describe('one', () => {
    it(('should return a movie with titulo like: Título 1'), async () => {
      const result = await controller.findOne('1');
      expect(result.titulo).toEqual('Título 1');
    })
  });
});

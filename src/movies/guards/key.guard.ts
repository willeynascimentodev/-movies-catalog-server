import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

ConfigModule.forRoot()
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor() {} // made up service for the point of the exmaple

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = req.headers['api_key'] ?? req.query.api_key;
    var message = '';
    
    if (!key) {
      message = 'Forneça uma Chave de API';  
      new UnauthorizedException(message)
    }

    if(!await this.checkApiKey(key)) {
      message = 'Chave Inválida';  
      new UnauthorizedException(message)
    }

    return await this.checkApiKey(key) ? true : false;
  }

  async checkApiKey(key: string): Promise<boolean> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(process.env.API_KEY, saltOrRounds);
    const isMatch = await bcrypt.compare(key, hash);
    return isMatch;

  }


}
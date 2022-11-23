import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import config from "../../config/keys";
import { MoviesService } from "../movies.service";

import * as bcrypt from 'bcrypt';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor() {} // made up service for the point of the exmaple

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = req.headers['api_key'] ?? req.query.api_key;
    
    return await this.checkApiKey(key) ? true : false;
  }

  async checkApiKey(key: string): Promise<boolean> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(config.apiKey, saltOrRounds);
    const isMatch = await bcrypt.compare(key, hash);
    return isMatch;

  }


}
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
/*
* Services are just as used for Angular or Ionic
 */
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
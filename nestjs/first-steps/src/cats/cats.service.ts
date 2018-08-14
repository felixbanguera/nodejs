import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
/*
* Services are just as used for Angular or Ionic
 */
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    console.log(`creating a Cat:`, cat);
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    console.log(`Finding ALL  Cats`);
    return this.cats;
  }
}
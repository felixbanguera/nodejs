/*
* About DTO:
* DTO (Data Transfer Object) schema.
* A DTO is an object that defines how the data will be sent over the network.
* We could do this by using TypeScript interfaces, or by simple classes.
* What may be surprising, we recommend using classes here.
* Why? Classes are part of the JavaScript ES6 standard, and therefore
* they represent just plain functions. On the other hand, TypeScript
* interfaces are removed during the transpilation, Nest can't refer to them.
*/
export class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
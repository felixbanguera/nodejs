import { Controller, Get, Req, Param, Post, HttpCode, Header, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  /**
   * Constructor to iject dependencies
   * @param catsService to be used for handling different stuff from http requests.
   */
  constructor(private readonly catsService: CatsService) {}
  /*
  * The following is a basic Get controller with no parameters
  * as no parameter is passed to the @Get decorator the the route
  * is the one set in the @Controller decorator.
  * To get request or params info you use decorators and parameters such as:
  * @Req() request.
  * Remember to import them from @nestjs/common
  */
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  /*
  *The following is a basic Get controller that accepts a parameter from the route
  * and is passed in as a parameter in params.
  * There are to ways to access it:
  * 1. @Param params and then params.param
  * 2. @Param('id') id and the use the param (id in this case.)
  */
  @Get(':id')
  findOne(@Param() params) {
    return `This action returns ONE cat: ${params.id}`;
  }

  /*
  * The followig is a Post Cotroller which will use the @controller route
  * Will specify the Code response with the @HttpCode decorator
  * Will specify a header value with the @Header decorator
  * */
  @Post()
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}

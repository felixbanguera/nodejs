// import 'reflect-metadata'
// This class will contain all types of methods to be tested in Middleware
export class ClassToTest {

  constructor(){
    // To be used to test private functions
    // Reflect.defineMetadata("private_method", this.private_method, ClassToTest.prototype, "private_method");
  }

  fn_returns_obj(){
    return {'vero': ''};
  }

  fn_method_exists(){
    return "console.log('WHAAATTT');";
  }

}
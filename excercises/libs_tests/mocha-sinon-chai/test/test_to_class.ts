import { ClassToTest } from '../class_to_test';
import * as chai from 'chai';
// chai.should();
var expect = chai.expect;
var assert = chai.assert;
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import 'mocha';

// Tests for methods returning an object
describe('ClassToTest.fn_returns_obj() function', () => {

  // Test it should return an object
  it('should return an object', () => {
    const _ClassToTest = new ClassToTest();
    const result = _ClassToTest.fn_returns_obj();
    assert.typeOf(result, 'Object');
  });
  // test the return should contain a specific key
  it('should return an object with key : vero', () => {
    const _ClassToTest = new ClassToTest();
    const result = _ClassToTest.fn_returns_obj();
    assert.property(result, 'vero');
  });
  // test a value of a specific key is of a specific type
  it('should return an object with key : vero and its value to be a string', () => {
    const _ClassToTest = new ClassToTest();
    const result = _ClassToTest.fn_returns_obj();
    assert.typeOf(result.vero, 'string');
  });

});

// Test a method exists
describe('ClassToTest.fn_method_exists() function', () => {
  it('should exist', () => {
    const _ClassToTest = new ClassToTest();
    assert.exists(_ClassToTest['fn_method_exists'], '_ClassToTest.fn_method_exists is neither `null` nor `undefined`');
  });
});

// test a return is undefined, for method that shouldn't return something, should this be tested?
describe('ClassToTest.fn_returns_nothing() function', () => {
  it('should not return anything', () => {
    const _ClassToTest = new ClassToTest();
    assert.isUndefined(_ClassToTest.fn_returns_nothing(), '_ClassToTest.fn_returns_nothing is returning a value, and should not');
  });
});

// Test a method exists, Typescript itself verifies that.
// test a method with parameters, to receive a parameter is being tested by Typescript as well as parameter types

// HOw to test a private method's functionality
// There are two ways, a simple, not sure why way:
//   Create an instance of the class and the access the method throug squer brakets:
//     _ClassToTest['fn_private']()
// The second one is to use reflection, but as Javascript doesn't support it, the a lib should be imported:
// 1. You need to use 'Reflect-metadata' in the class and somewhere set the function as metadata
// 2. In the description of the test you need to get the metadata instance
describe('ClassToTest.fn_private() function', () => {
  // The first method
  it('should return true using square brakets', () => {
    const _ClassToTest = new ClassToTest();
    const metadataValue = Reflect.getMetadata("private_method", _ClassToTest, "private_method");
    const result = _ClassToTest['fn_private']();
    assert.equal(result, true);
  });

  it('should return true using reflection', () => {
    const _ClassToTest = new ClassToTest();
    const metadataValue = Reflect.getMetadata("private_method", _ClassToTest, "private_method");
    const result = metadataValue();
    assert.equal(result, true);
  });
});



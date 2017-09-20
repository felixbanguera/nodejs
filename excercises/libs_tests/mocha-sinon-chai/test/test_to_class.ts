import { ClassToTest } from '../class_to_test';
import * as chai from 'chai';
chai.should();
var expect = chai.expect;
var assert = chai.assert;
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import 'mocha';

describe('ClassToTest.private_method() function', () => {
  it('should return an object', () => {
    const _ClassToTest = new ClassToTest();
    const metadataValue = Reflect.getMetadata("private_method", _ClassToTest, "private_method");
    const result = metadataValue();
    assert.typeOf(result, 'Object');
    expect(result).to.be.a('Object');
    result.should.be.a('Object');
  });


});
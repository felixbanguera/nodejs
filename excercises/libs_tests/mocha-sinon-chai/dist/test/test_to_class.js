"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_to_test_1 = require("../class_to_test");
const chai = require("chai");
// chai.should();
var expect = chai.expect;
var assert = chai.assert;
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
require("mocha");
describe('ClassToTest.fn_returns_obj() function', () => {
    // it('should return an object', () => {
    //   const _ClassToTest = new ClassToTest();
    //   const metadataValue = Reflect.getMetadata("private_method", _ClassToTest, "private_method");
    //   const result = metadataValue();
    //   assert.typeOf(result, 'Object');
    //   expect(result).to.be.a('Object');
    //   result.should.be.a('Object');
    // });
    it('should return an object', () => {
        const _ClassToTest = new class_to_test_1.ClassToTest();
        const result = _ClassToTest.fn_returns_obj();
        assert.typeOf(result, 'Object');
    });
    it('should return an object with key : vero', () => {
        const _ClassToTest = new class_to_test_1.ClassToTest();
        const result = _ClassToTest.fn_returns_obj();
        assert.property(result, 'vero');
    });
    it('should return an object with key : vero and its value to be a string', () => {
        const _ClassToTest = new class_to_test_1.ClassToTest();
        const result = _ClassToTest.fn_returns_obj();
        assert.typeOf(result.vero, 'string');
    });
});
describe('ClassToTest.fn_method_exists() function', () => {
    it('should exist', () => {
        const _ClassToTest = new class_to_test_1.ClassToTest();
        assert.exists(_ClassToTest['fn_method_exists'], '_ClassToTest.fn_method_exists is neither `null` nor `undefined`');
    });
});
describe('ClassToTest.fn_private_method() function', () => {
    it('should not be called outside the class scope', () => {
        const _ClassToTest = new class_to_test_1.ClassToTest();
        _ClassToTest.fn_private_method();
        expect(new class_to_test_1.ClassToTest()).to.respondTo('fn_private_method');
    });
});

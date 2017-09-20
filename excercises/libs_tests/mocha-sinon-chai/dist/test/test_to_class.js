"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_to_test_1 = require("../class_to_test");
const chai_1 = require("chai");
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
require("mocha");
describe('ClassToTest.fn_returns_obj() function', () => {
    it('should return an object', () => {
        const _ClassToTest = new class_to_test_1.ClassToTest();
        const meta_ClassToTest = Reflect.getOwnMetadataKeys(_ClassToTest);
        console.log(`meta_ClassToTest: ${meta_ClassToTest}`);
        const result = _ClassToTest.fn_returns_obj({});
        chai_1.assert.typeOf(result, 'Object');
    });
});

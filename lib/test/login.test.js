"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const api_1 = require("../src/api");
describe('Test OPSI API Login', function () {
    this.timeout(15000);
    describe('Api Login Fail', () => {
        it('Login Fail or connection problem', () => __awaiter(this, void 0, void 0, function* () {
            const api = new api_1.OPSIApi('https://localhost:4447', 'opsi', 'FAIL');
            // assert.isObject(api)
            const { success, message } = yield api.getOpsiVersion();
            // console.error(message)
            // console.log(data)
            chai_1.assert.isFalse(success);
        }));
        it('Login Fail missing parameter', () => {
            chai_1.should().throw(() => {
                new api_1.OPSIApi('https://localhost:4447', 'opsi', ''); // tslint:disable-line
            });
        });
    });
    describe('Api Login Success', () => {
        it('Login Success', () => {
            chai_1.should().not.throw(() => {
                new api_1.OPSIApi('https://localhost:4447', 'opsi', 'opsi'); // tslint:disable-line
            });
        });
    });
});
//# sourceMappingURL=login.test.js.map
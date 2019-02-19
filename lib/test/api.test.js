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
describe('Test OPSI API', function () {
    const api = new api_1.OPSIApi('https://localhost:4447', 'opsi', 'opsi');
    this.timeout(1000);
    describe('#getOpsiVersion()', () => {
        it('is opsi version avaibale', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.getOpsiVersion();
            // console.log(data)
            chai_1.assert.isOk(success);
        }));
    });
    describe('#isAuthenticated()', () => {
        it('get boolean for is user authenticated', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.isAuthenticated();
            chai_1.assert.isTrue(success);
            chai_1.assert.isTrue(data);
        }));
    });
    describe('#isUserAdmin()', () => {
        it('get boolean for is user admin', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.isUserAdmin();
            chai_1.assert.isTrue(success);
            chai_1.assert.isTrue(data);
        }));
    });
    describe('#getServerID()', () => {
        it('more then zreo server id', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.getServerIDs();
            chai_1.assert.isTrue(success);
            chai_1.assert.isArray(data);
            chai_1.expect(data.length).is.greaterThan(0);
        }));
    });
    describe('#getOpsiServerInfo()', () => {
        it('get object woth server infos', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.getOpsiServerInfo();
            // console.log(data)
            chai_1.assert.isTrue(success);
            chai_1.assert.isArray(data);
            chai_1.expect(data[0].type).is.equal('OpsiConfigserver');
        }));
    });
});
//# sourceMappingURL=api.test.js.map
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
    let api = new api_1.OPSIApi('https://localhost:4447', 'opsi', 'opsi');
    this.timeout(800);
    describe('#getOpsiVersion()', function () {
        it('is opsi version avaibale', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.getOpsiVersion();
            console.log(data);
            chai_1.assert.isOk(success);
        }));
    });
    // describe('#isAuthenticated()', function () {
    // 	it('get boolean for is user authenticated', function (done) {
    // 		api.isAuthenticated(function (res) {
    // 			assert.isOk(res.success)
    // 			assert.isOk(res.data)
    // 			done()
    // 		})
    // 	})
    // })
    //
    // describe('#isUserAdmin()', function () {
    // 	it('get boolean for is user admin', function (done) {
    // 		api.isUserAdmin(function (res) {
    // 			assert.isOk(res.success)
    // 			assert.isOk(res.data)
    // 			done()
    // 		})
    // 	})
    // })
    //
    // describe('#getServerID()', function () {
    // 	it('more then zreo server id', function (done) {
    // 		api.serverIDs(function (res) {
    // 			assert.isOk(res.success)
    // 			assert.isOk(res.data instanceof Array, 'Array Expected')
    // 			done()
    // 		})
    // 	})
    // })
    //
    // describe('#getOpsiServerInfo()', function () {
    // 	it('get object woth server infos', function (done) {
    // 		api.getOpsiServerInfo(function (res) {
    // 			assert.isOk(res.success)
    // 			assert.isOk(res.data instanceof Array, 'Array Expected')
    // 			assert.equal(res.data[0].type, 'OpsiConfigserver')
    // 			done()
    // 		})
    // 	})
    // })
});

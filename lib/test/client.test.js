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
describe('Test OPSI API Client Actions', function () {
    const api = new api_1.OPSIApi('https://localhost:4447', 'opsi', 'opsi');
    this.timeout(2000);
    const clientName = 'testclient-' + Math.floor(Math.random() * 500 + 1);
    const domain = 'opsi.docker.lan';
    describe('#createClient()', () => {
        it('create a new client', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data, message } = yield api.createClient(clientName, domain, 'Test Client', '', '', '');
            // console.log(data)
            chai_1.assert.isOk(success);
            chai_1.expect(data).to.equal(clientName + '.' + domain);
            chai_1.assert.isEmpty(message);
        }));
        it('create a new client fail no parameter', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data, message } = yield api.createClient('', '', '', '', '', '');
            // console.log(message)
            chai_1.assert.isFalse(data);
            chai_1.assert.isFalse(success);
            chai_1.assert.isString(message);
        }));
        it('create a new client fail wrong name', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data, message } = yield api.createClient('Test Client', 'this should fail', '', '', '', '');
            // console.log(data)
            chai_1.assert.isFalse(success);
            chai_1.assert.isObject(data);
            chai_1.assert.isString(message);
        }));
    });
    describe('#getClientInfo()', () => {
        it('get client info', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.getClientInfo(clientName + '.' + domain);
            // console.log(data) // tslint:disable-line
            chai_1.assert.isObject(data);
            chai_1.assert.isTrue(success);
            chai_1.expect(data.hostId).is.equal(clientName + '.' + domain);
        }));
        it('get client info fail with valid domain', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data, message } = yield api.getClientInfo('test.' + domain);
            // console.log(message)
            chai_1.assert.isObject(data);
            chai_1.assert.isFalse(success);
            chai_1.assert.isString(message);
        }));
        it('get client info fail', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data, message } = yield api.getClientInfo('this shoul fail');
            // console.log(message)
            chai_1.assert.isObject(data);
            chai_1.assert.isFalse(success);
            chai_1.assert.isString(message);
        }));
    });
    describe('#getAllClients()', () => {
        it('get all client list and its greater then zero', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.getAllClients();
            // console.log(data) // tslint:disable-line
            chai_1.assert.isArray(data);
            chai_1.assert.isTrue(success);
            chai_1.expect(data.length).is.greaterThan(0);
        }));
    });
    describe('#renameClient()', () => {
        const testclient = 'typo-client';
        const correctName = 'renamed-client-' + Math.floor(Math.random() * 500 + 1);
        it('create client rename one', () => __awaiter(this, void 0, void 0, function* () {
            const newClient = yield api.createClient(testclient, domain, 'Test rename Client', '', '', '');
            // console.log(newClient.data)
            const { success, data } = yield api.renameClient(newClient.data, correctName + '.' + domain);
            // console.log(success)
            // console.log(data)
            chai_1.assert.isTrue(success);
            chai_1.assert.isTrue(data);
        }));
        it('FAILES: rename', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data, message } = yield api.renameClient('foo', correctName + '.' + domain);
            // console.log(data)
            chai_1.assert.isObject(data); // error data object
            chai_1.assert.isFalse(success);
            chai_1.assert.isString(message);
        }));
    });
    describe('#deleteClient()', () => {
        it('delete a client', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data, message } = yield api.deleteClient(clientName + '.' + domain);
            chai_1.assert.isNull(data);
            chai_1.assert.isTrue(success);
        }));
        it('FAILED: delete a client', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data, message } = yield api.deleteClient('del_client_fail');
            chai_1.assert.isObject(data);
            chai_1.assert.isFalse(success);
            chai_1.assert.isString(message);
        }));
    });
    // TODO: get software, hardware and product infos for one client
    // describe('#getAllClientData()', () => {
    //   it('get huge client object', async () => {
    //     // prepare test client with data
    //
    //
    //     const { success, data } = await api.getAllClientData(clientName + '.' + domain);
    //     console.log(data) // tslint:disable-line
    //     assert.isObject(data);
    //     assert.isTrue(success);
    //   });
    // })
});
//# sourceMappingURL=client.test.js.map
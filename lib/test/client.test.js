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
    let api = new api_1.OPSIApi('https://localhost:4447', 'opsi', 'opsi');
    this.timeout(1000);
    let clientName = 'testclient-' + Math.floor((Math.random() * 500) + 1);
    let domain = 'opsi.docker.lan';
    describe('#createClient()', function () {
        it('create a new client', () => __awaiter(this, void 0, void 0, function* () {
            const data = yield api.createClient(clientName, domain, 'Test Client', '', '', '');
            console.log(data);
            chai_1.assert.isOk(data);
        }));
        it('create a new client fail no parameter', () => __awaiter(this, void 0, void 0, function* () {
            const data = yield api.createClient(clientName, domain, 'Test Client', '', '', '');
            console.log(data);
            chai_1.assert.isOk(data);
        }));
    });
    //
    // describe('#getClientInfo()', function () {
    // 	it('get client info', function (done) {
    // 		api.getClientInfo(clientName + '.' + domain, function (res) {
    // 			// console.log(res)
    // 			assert.ok(res.success)
    // 			assert.ok(res.data instanceof Object, 'Object Expected')
    // 			assert.deepStrictEqual(res.data.hostId, clientName + '.' + domain, 'Client Name Expected')
    // 			done()
    // 		})
    // 	})
    //
    // 	it('get client info fail with not existent client', function (done) {
    // 		api.getClientInfo('foo', function (res) {
    // 			// console.log(res)
    // 			// assert.ok(res.success)
    // 			assert.equal(res.success, false)
    // 			assert.ok(res.message)
    // 			done()
    // 		})
    // 	})
    // })
    //
    // describe('#getAllClients()', function () {
    // 	it('get all client list and its greater then zero', function (done) {
    // 		api.getAllClients(function (res) {
    // 			assert.ok(res.success)
    // 			assert.ok(res.data instanceof Array, 'Array Expected')
    // 			// console.log(res)
    // 			done()
    // 		})
    // 	})
    // })
    //
    // describe('#renameClient()', function () {
    // 	let testclient = 'typo-client'
    // 	let correctName = 'renamed-client-' + Math.floor((Math.random() * 500) + 1)
    // 	it('create client rename one', function (done) {
    // 		api.createClient(testclient,
    // 			domain,
    // 			'Test rename Client',
    // 			'',
    // 			'',
    // 			'',
    // 			function (client) {
    // 				api.renameClient(client.data, correctName + '.' + domain, function (res) {
    // 					assert.ok(res.success)
    // 					assert.ok(res.data)
    // 					done()
    // 				})
    // 			})
    // 	})
    //
    //
    // 	it('FAILES: rename', function (done) {
    // 		api.renameClient('foo', correctName + '.' + domain, function (res) {
    // 			// console.log(res)
    // 			assert.equal(res.success, false)
    // 			assert.ok(res.message)
    // 			done()
    // 		})
    // 	})
    // })
    //
    // describe('#deleteClient()', function () {
    // 	it('delete a client', function (done) {
    // 		api.deleteClient(
    // 			clientName + '.' + domain,
    // 			function (res) {
    // 				assert.ok(res.success)
    // 				assert.ok(res.data)
    // 				done()
    // 			})
    // 	})
    //
    // 	it('FAILED: delete a client', function (done) {
    // 		api.deleteClient(
    // 			'del_client_fail',
    // 			function (res) {
    // 				// console.error('Error: ', data.message)
    // 				assert.equal(res.success, false)
    // 				assert.ok(res.message)
    // 				done()
    // 			})
    // 	})
    // })
    // TODO: get software, hardware and product infos for one client
});
//# sourceMappingURL=client.test.js.map
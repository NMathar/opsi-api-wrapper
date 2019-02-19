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
describe('Test OPSI API Groups Actions', function () {
    this.timeout(5000);
    const randomGroupName = 'testgroup_' + Math.floor(Math.random() * 500 + 1);
    // create group add/remove test client
    const tmpclient = 'grouptestclient';
    const tmpdomain = 'opsi.docker.lan';
    const api = new api_1.OPSIApi('https://localhost:4447', 'opsi', 'opsi');
    describe('#createHostGroup()', () => {
        it('create group', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data, message } = yield api.createHostGroup(randomGroupName, '', '', '');
            chai_1.assert.isTrue(data);
            chai_1.assert.isTrue(success);
        }));
        it('FAILED: create group fail no parameter', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data, message } = yield api.createHostGroup('', '', '', '');
            chai_1.assert.isFalse(data);
            chai_1.assert.isString(message);
            chai_1.assert.isFalse(success);
        }));
    });
    describe('#getHostGroupInfo()', () => {
        it('get group info', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.getHostGroupInfo(randomGroupName);
            console.log(data); // tslint:disable-line
            chai_1.assert.isTrue(success);
            chai_1.assert.isObject(data);
            chai_1.expect(data.ident).is.equal(randomGroupName);
        }));
    });
    describe('#getAllHostGroups()', () => {
        it('get all host groups list and its greater then zero', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.getAllHostGroups();
            // console.log(data) // tslint:disable-line
            chai_1.assert.isTrue(success);
            chai_1.assert.isArray(data);
        }));
    });
    describe('#groupNameExists()', () => {
        it('check if group exist -> true', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.groupNameExists(randomGroupName);
            chai_1.assert.isTrue(data);
            chai_1.assert.isTrue(success);
        }));
        it('check if group exist -> false', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.groupNameExists('test_group_fail');
            chai_1.assert.isFalse(data);
            chai_1.assert.isTrue(success);
        }));
    });
    describe('#addClientToGroup()', () => {
        // attention takes long time to success
        it('create a client and add the client to group', () => __awaiter(this, void 0, void 0, function* () {
            // add client first
            const client = yield api.createClient(tmpclient, tmpdomain, 'Test Client', '', '', '');
            const { success, data } = yield api.addClientToGroup(client.data, randomGroupName);
            chai_1.assert.isTrue(data);
            chai_1.assert.isTrue(success);
        }));
        it('FAILED: add none existent client to group', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.addClientToGroup('foo', randomGroupName);
            chai_1.assert.isFalse(data);
            chai_1.assert.isFalse(success);
        }));
        it('FAILED: add client to not existing group', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.addClientToGroup(tmpclient + '.' + tmpdomain, 'foo');
            chai_1.assert.isFalse(data);
            chai_1.assert.isFalse(success);
        }));
    });
    describe('#getGroupClients()', () => {
        it('get clients from group', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.getGroupClients(randomGroupName);
            console.log(data); // tslint:disable-line
            chai_1.assert.isTrue(success);
            chai_1.assert.isArray(data);
        }));
    });
    describe('#removeClientFromGroup()', () => {
        it('remove client from group by id', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.removeClientFromGroup(tmpclient + '.' + tmpdomain, randomGroupName);
            chai_1.assert.isTrue(data);
            chai_1.assert.isTrue(success);
        }));
        it('FAILED: remove client from not existent group by id', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data, message } = yield api.removeClientFromGroup(tmpclient + '.' + tmpdomain, 'foo');
            chai_1.assert.isFalse(data);
            chai_1.assert.isString(message);
            chai_1.assert.isFalse(success);
        }));
        it('FAILED: remove not existent client group', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data, message } = yield api.removeClientFromGroup('test.' + tmpdomain, randomGroupName);
            chai_1.assert.isFalse(data);
            chai_1.assert.isString(message);
            chai_1.assert.isFalse(success);
        }));
    });
    describe('#renameGroup()', () => {
        const testgroup = 'typo-group';
        const correctName = 'renamed-group-' + Math.floor(Math.random() * 500 + 1);
        it('create client rename one', () => __awaiter(this, void 0, void 0, function* () {
            const group = yield api.createHostGroup(testgroup, '', '', '');
            const { success, data } = yield api.renameGroup(testgroup, correctName);
            // console.log(data)
            chai_1.assert.isTrue(data);
            chai_1.assert.isTrue(success);
        }));
        it('FAILES: rename group', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data, message } = yield api.renameGroup('foo', correctName);
            chai_1.assert.isObject(data);
            chai_1.assert.isString(message);
            chai_1.assert.isFalse(success);
            chai_1.expect(data.message).is.equal(message);
        }));
    });
    describe('#deleteGroup()', () => {
        it('delete group by group name', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.deleteGroup(randomGroupName);
            chai_1.assert.isTrue(data);
            chai_1.assert.isTrue(success);
        }));
        it('FAILED: delete group by group name', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data, message } = yield api.deleteGroup('');
            chai_1.assert.isFalse(data);
            chai_1.assert.isString(message);
            chai_1.assert.isFalse(success);
        }));
    });
});
//# sourceMappingURL=groups.test.js.map
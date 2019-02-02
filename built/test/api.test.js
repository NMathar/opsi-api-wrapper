"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var api_1 = require("../src/api");
describe('Test OPSI API', function () {
    var api = new api_1.default('https://localhost:4447', 'opsi', 'opsi');
    this.timeout(500);
    describe('#getOpsiVersion()', function () {
        it('is opsi version avaibale', function (done) {
            api.getOpsiVersion(function (res) {
                chai_1.assert.isOk(res.success);
                chai_1.assert.isOk(res.data);
                done();
            });
        });
    });
    describe('#isAuthenticated()', function () {
        it('get boolean for is user authenticated', function (done) {
            api.isAuthenticated(function (res) {
                chai_1.assert.isOk(res.success);
                chai_1.assert.isOk(res.data);
                done();
            });
        });
    });
    describe('#isUserAdmin()', function () {
        it('get boolean for is user admin', function (done) {
            api.isUserAdmin(function (res) {
                chai_1.assert.isOk(res.success);
                chai_1.assert.isOk(res.data);
                done();
            });
        });
    });
    describe('#getServerID()', function () {
        it('more then zreo server id', function (done) {
            api.serverIDs(function (res) {
                chai_1.assert.isOk(res.success);
                chai_1.assert.isOk(res.data instanceof Array, 'Array Expected');
                done();
            });
        });
    });
    describe('#getOpsiServerInfo()', function () {
        it('get object woth server infos', function (done) {
            api.getOpsiServerInfo(function (res) {
                chai_1.assert.isOk(res.success);
                chai_1.assert.isOk(res.data instanceof Array, 'Array Expected');
                chai_1.assert.equal(res.data[0].type, 'OpsiConfigserver');
                done();
            });
        });
    });
});

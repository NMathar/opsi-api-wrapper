import {expect, assert} from 'chai';
import {OPSIApi} from "../src/api";

describe('Test OPSI API', function () {
    let api = new OPSIApi('https://localhost:4447', 'opsi', 'opsi')
    this.timeout(800)

    describe('#getOpsiVersion()', function () {
        it('is opsi version avaibale', async () => {
            const {success, data} = await api.getOpsiVersion()
            console.log(data)
            assert.isOk(success)
        });
    })

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

})

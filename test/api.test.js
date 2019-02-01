let assert = require('assert')
let API = require('../src/api')

describe('Test OPSI API', function () {
	let api = new API('https://localhost:4447', 'opsi', 'opsi')
	this.timeout(500)

	describe('#getOpsiVersion()', function () {
		it('is opsi version avaibale', function (done) {
			api.getOpsiVersion(function (res) {
				assert.ok(res.success)
				assert.ok(res.data)
				done()
			})
		})
	})

	describe('#isAuthenticated()', function () {
		it('get boolean for is user authenticated', function (done) {
			api.isAuthenticated(function (res) {
				assert.ok(res.success)
				assert.ok(res.data)
				done()
			})
		})
	})

	describe('#isUserAdmin()', function () {
		it('get boolean for is user admin', function (done) {
			api.isUserAdmin(function (res) {
				assert.ok(res.success)
				assert.ok(res.data)
				done()
			})
		})
	})

	describe('#getServerID()', function () {
		it('more then zreo server id', function (done) {
			api.serverIDs(function (res) {
				assert.ok(res.success)
				assert.ok(res.data instanceof Array, 'Array Expected')
				done()
			})
		})
	})

})

let assert = require('assert')
let API = require('../src/api')

describe('Test OPSI API', function () {
	let api = new API('https://localhost:4447', 'opsi', 'opsi')
	this.timeout(500)

	describe('#getOpsiVersion()', function () {
		it('is opsi version avaibale', function (done) {
			api.getOpsiVersion(function (data) {
				console.log(data)
				assert.ok(data.length > 0)
				done()
			})
		})
	})

	describe('#isAuthenticated()', function () {
		it('get boolean for is user authenticated', function (done) {
			api.isAuthenticated(function (boolean) {
				assert.equal(boolean, true)
				done()
			})
		})
	})

	describe('#isUserAdmin()', function () {
		it('get boolean for is user admin', function (done) {
			api.isUserAdmin(function (boolean) {
				assert.equal(boolean, true)
				done()
			})
		})
	})

	describe('#getServerID()', function () {
		it('more then zreo server id', function (done) {
			api.serverIDs(function (data) {
				assert.ok(data.length > 0)
				done()
			})
		})
	})

})

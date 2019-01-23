let assert = require('assert')
let API = require('../src/api')

describe('Test OPSI API', function () {
	let api = new API('https://localhost:4447', 'opsi', 'opsi')
	this.timeout(500)

	describe('#getOpsiVersion()', function () {
		it('is opsi version avaibale', function (done) {
			api.getOpsiVersion(function (res) {
				if(res.success){
					assert.ok(res.success)
				}else{
					console.error('Error: ',res.message)
					assert.ok(res.message)
				}
				done()
			})
		})
	})

	describe('#isAuthenticated()', function () {
		it('get boolean for is user authenticated', function (done) {
			api.isAuthenticated(function (res) {
				if(res.success){
					assert.ok(res.success)
				}else{
					console.error('Error: ',res.message)
					assert.ok(res.message)
				}
				done()
			})
		})
	})

	describe('#isUserAdmin()', function () {
		it('get boolean for is user admin', function (done) {
			api.isUserAdmin(function (res) {
				if(res.success){
					assert.ok(res.success)
				}else{
					console.error('Error: ',res.message)
					assert.ok(res.message)
				}
				done()
			})
		})
	})

	describe('#getServerID()', function () {
		it('more then zreo server id', function (done) {
			api.serverIDs(function (res) {
				if(res.success){
					assert.ok(res.success)
				}else{
					console.error('Error: ',res.message)
					assert.ok(res.message)
				}
				done()
			})
		})
	})

})

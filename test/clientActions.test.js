let assert = require('assert')
let API = require('../src/api')

let api = new API('https://localhost:4447', 'opsi', 'opsi')

describe('Test OPSI API Client Command Actions', function () {
	this.timeout(500)

	//TODO: create test client


	describe('#clientReboot()', function () {
		it('reboot client', function (done) {
			api.clientReboot('testclient', function (res) {
				console.log(res)
				// assert.ok(res.success)

				// tmp solution till test client is created
				assert.ok(res.message)
				assert.equal(res.success, false)
				done()
			})
		})

		it('FAILED: try to reboot not existent client', function (done) {
			api.clientReboot('foo', function (res) {
				assert.ok(res.message)
				assert.equal(res.success, false)
				done()
			})
		})
	})

	//TODO: start audits


})

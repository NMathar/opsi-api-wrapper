let assert = require('assert')
let API = require('../src/api')

describe('Test OPSI API Client Actions', function () {
	let api = new API('https://localhost:4447', 'opsi', 'opsi')
	this.timeout(500)
	let clientName = 'testclient-' + Math.floor((Math.random() * 500) + 1)
	let domain = 'opsi.docker.lan'

	describe('#createClient()', function () {
		it('create a new client', function (done) {
			api.createClient(clientName,
				domain,
				'Test Client',
				'',
				'',
				'',
				function (data) {
					if (data.success) {
						assert.ok(data.success)
						console.log(data)
					} else {
						console.error('Error: ', data.message)
						assert.ok(data.message)
					}
					done()
				})
		})
	})

	describe('#deleteClient()', function () {
		it('delete a client', function (done) {
			api.deleteClient(
				// clientName + '.' + domain,
				'testclient-302.opsi.docker.lan',
				function (data) {
					if (data.message) {
						console.error('Error: ', data.message)
						assert.ok(data.message)
					} else {
						assert.ok(data)
						// console.log('Success: ', data)
					}
					done()
				})
		})
	})

	describe('#getAllClients()', function () {
		it('get all client list and its greater then zero', function (done) {
			api.getAllClients(function (data) {
				if (data.success) {
					assert.ok(data.success)
					console.log(data)
				} else {
					console.error('Error: ', data.message)
					assert.ok(data.message)
				}
				done()
			})
		})
	})
})

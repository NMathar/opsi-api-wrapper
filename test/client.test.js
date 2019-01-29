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
					assert.ok(data.success)
					assert.deepStrictEqual(data.data, clientName + '.' + domain)
					// console.log(data)
					done()
				})
		})

		it('create a new client fail no parameter', function (done) {
			api.createClient('',
				'',
				'',
				'',
				'',
				'',
				function (data) {
					console.error('Error: ', data.message)
					assert.ok(data.message)
					done()
				})
		})
	})

	describe('#deleteClient()', function () {
		it('delete a client', function (done) {
			api.deleteClient(
				clientName + '.' + domain,
				function (data) {
					assert.ok(data)
					done()
				})
		})

		it('delete a client FAILED', function (done) {
			api.deleteClient(
				'del_client_fail',
				function (data) {
					// console.error('Error: ', data.message)
					assert.ok(data.message)
					done()
				})
		})
	})

	describe('#getAllClients()', function () {
		it('get all client list and its greater then zero', function (done) {
			api.getAllClients(function (data) {
				assert.ok(data.success)
				assert.ok(data.data instanceof Array)
				// console.log(data)
				done()
			})
		})
	})
})

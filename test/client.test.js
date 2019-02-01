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
				function (res) {
					assert.ok(res.success)
					assert.deepStrictEqual(res.data, clientName + '.' + domain, 'Client Name Expected')
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
				function (res) {
					// console.error('Error: ', data.message)
					assert.equal(res.success, false)
					assert.ok(res.message)
					done()
				})
		})
	})

	describe('#getClientInfo()', function () {
		it('get client info', function (done) {
			api.getClientInfo(clientName + '.' + domain, function (res) {
				// console.log(res)
				assert.ok(res.success)
				assert.ok(res.data instanceof Object, 'Object Expected')
				assert.deepStrictEqual(res.data.ident, clientName + '.' + domain, 'Client Name Expected')
				done()
			})
		})
	})

	describe('#getAllClients()', function () {
		it('get all client list and its greater then zero', function (done) {
			api.getAllClients(function (res) {
				assert.ok(res.success)
				assert.ok(res.data instanceof Array, 'Array Expected')
				console.log(res)
				done()
			})
		})
	})

	describe('#deleteClient()', function () {
		it('delete a client', function (done) {
			api.deleteClient(
				clientName + '.' + domain,
				function (res) {
					assert.ok(res.success)
					assert.ok(res.data)
					done()
				})
		})

		it('delete a client FAILE', function (done) {
			api.deleteClient(
				'del_client_fail',
				function (res) {
					// console.error('Error: ', data.message)
					assert.equal(res.success, false)
					assert.ok(res.message)
					done()
				})
		})
	})

})

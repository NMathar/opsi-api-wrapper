let assert = require('assert')
let API = require('../src/api')

describe('Test OPSI API Client Actions', function () {
	let api = new API('https://localhost:4447', 'opsi', 'opsi')
	this.timeout(500)

	describe('#createClient()', function () {
		it('create a new client', function (done) {
			console.log('create client')
			api.createClient('testclient',
				'opsi.docker.lan',
				'Test Client',
				'',
				'',
				'',
				function (data) {
					if(data.success){
						assert.ok(data.success)
					}else{
						console.error('Error: ',data.message)
						assert.ok(data.message)
					}
					done()
				})
		})
	})

	describe('#getAllClients()', function () {
		it('get all client list and its greater then zero', function (done) {
			api.getAllClients(function (data) {
				if(data.success){
					assert.ok(data.success)
				}else{
					console.error('Error: ',data.message)
					assert.ok(data.message)
				}
				done()
			})
		})
	})
})

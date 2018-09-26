let assert = require('assert')
let API = require('../src/api')
describe('Test OPSI API', function () {
	let api = new API('https://localhost:4447', 'opsi', 'opsi')
	describe('#getServerID()', function () {
		it('more then one server id', function () {
			api.serverIDs(function (data) {
				assert.ok(data.length > 0)
			})
		})
	})

	describe('#getProductActionList()', function () {
		it('get product list', function () {
			api.serverIDs(function (servers) {
				api.actionsForProduct('',servers[0], function (data) {
					console.log(data)
				})
			})
		})
	})
})

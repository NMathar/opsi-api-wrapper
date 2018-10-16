let assert = require('assert')
let API = require('../src/api')
describe('Test OPSI API', function () {
	let api = new API('https://localhost:4447', 'opsi', 'opsi')

	describe('#isAuthenticated()', function () {
		it('get boolean for is user authenticated', function () {
			api.isAuthenticated(function (boolean) {
				assert.ok(boolean)
			})
		})
	})

	describe('#isUserAdmin()', function () {
		it('get boolean for is user admin', function () {
			api.isUserAdmin(function (boolean) {
				assert.ok(boolean)
			})
		})
	})

	describe('#getServerID()', function () {
		it('more then one server id', function () {
			api.serverIDs(function (data) {
				assert.ok(data.length > 0)
			})
		})
	})

	describe('#getProductActionList()', function () {
		it('get product list and its greater then zero', function () {
			api.serverIDs(function (servers) {
				api.actionsForProduct('', servers[0], function (data) {
					// console.log(data)
					assert.ok(data.length > 0)
				})
			})
		})
	})

	describe('#getAllClients()', function () {
		it('get all client list and its greater then zero', function () {
			api.getAllClients(function (data) {
				console.log('clients ', data)
				assert.ok(data.length > 0)
			})
		})
	})


	describe('#getAllProducts()', function () {
		it('get all products list and its greater then zero', function () {
			api.getAllProducts(function (data) {
				console.log('products ', data)
				assert.ok(data.length > 0)
			})
		})
	})


	describe('#getAllGroups()', function () {
		it('get all groups list and its greater then zero', function () {
			api.getAllGroups(function (data) {
				console.log('groups ', data)
				assert.ok(data.length > 0)
			})
		})
	})
})

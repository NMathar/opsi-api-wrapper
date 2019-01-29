let assert = require('assert')
let API = require('../src/api')

let api = new API('https://localhost:4447', 'opsi', 'opsi')

describe('Test OPSI API Product Actions', function () {
	describe('#getProductActionList()', function () {
		it('get product action list', function (done) {
			api.serverIDs(function (servers) {
				api.actionsForProduct('', servers[0], function (data) {
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

	describe('#getAllProducts()', function () {
		it('get all products', function (done) {
			api.getAllProducts(function (data) {
				// console.log('products ', data)
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

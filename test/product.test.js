let assert = require('assert')
let API = require('../src/api')

let api = new API('https://localhost:4447', 'opsi', 'opsi')

describe('Test OPSI API Product Actions', function () {
	this.timeout(500)

	//TODO: create product

	// describe('#getProductActionList()', function () {
	// 	it('get product action list', function (done) {
	// 		api.serverIDs(function (servers) {
	// 			api.actionsForProduct('', servers[0], function (data) {
	// 				if(data.success){
	// 					assert.ok(data.success)
	// 				}else{
	// 					console.error('Error: ',data.message)
	// 					assert.ok(data.message)
	// 				}
	// 				done()
	// 			})
	// 		})
	// 	})
	// })

	describe('#getAllProducts()', function () {
		it('get all products', function (done) {
			api.getAllProducts(function (res) {
				// console.log('products ', data)
				assert.ok(res.success)
				assert.ok(res.data instanceof Array, 'Array Expected')
				console.log(res)
				done()
			})
		})
	})
})

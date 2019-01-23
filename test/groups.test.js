let assert = require('assert')
let API = require('../src/api')

let api = new API('https://localhost:4447', 'opsi', 'opsi')

// TODO: create first a group
describe('Test OPSI API Groups Actions', function () {
	describe('#getAllGroups()', function () {
		this.timeout(5000)
		it('get all groups list and its greater then zero', function (done) {
			api.getAllGroups(function (res) {
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

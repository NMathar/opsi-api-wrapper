let assert = require('assert')
let API = require('../src/api')

let api = new API('https://localhost:4447', 'opsi', 'opsi')

describe('Test OPSI API Groups Actions', function () {
	this.timeout(500)
	let randomGroupName = 'testgroup_' + Math.floor((Math.random() * 500) + 1)

	describe('#createHostGroup()', function () {
		it('create group', function (done) {
			api.createHostGroup(
				randomGroupName,
				'Test Group',
				'',
				'',
				function (res) {
					console.error(res.message)

					assert.ok(res.success)
					assert.deepStrictEqual(res.data, randomGroupName, 'Group Name Expected')
					done()
				}
			)
		})

		it('create group fail no parameter', function (done) {
			api.createHostGroup(
				'',
				'',
				'',
				'',
				function (res) {
					console.error('Error: ', res.message)
					assert.ok(res.message)
					done()
				}
			)
		})
	})

	// TODO: add members to group
	// it('add members to group', function (done) {
	//
	// })


	describe('#getHostGroupInfo()', function () {
		it('get group info', function (done) {
			api.getHostGroupInfo(randomGroupName, '', function (res) {
				console.error(res.message)
				assert.ok(res.success)
				assert.ok(res.data instanceof Array, 'Array Expected')
				assert.deepStrictEqual(res.data[0].ident, randomGroupName, 'Group Name Expected')
				done()
			})
		})
	})


	describe('#getAllGroups()', function () {
		it('get all groups list and its greater then zero', function (done) {
			api.getAllGroups(function (res) {
				assert.ok(res.success)
				assert.ok(res.data instanceof Array, 'Array Expected')
				// console.log(data)
				done()
			})
		})
	})
})

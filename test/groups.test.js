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
				'',
				'',
				'',
				function (res) {
					// console.error(res.message)
					assert.ok(res.success)
					assert.equal(res.data, null)
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
					// console.error('Error: ', res.message)
					assert.equal(res.success, false)
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


	//TODO: not working
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


	describe('#getAllHostGroups()', function () {
		it('get all host groups list and its greater then zero', function (done) {
			api.getAllHostGroups(function (res) {
				assert.ok(res.success)
				assert.ok(res.data instanceof Array, 'Array Expected')
				console.log(res.data)
				done()
			})
		})
	})

	describe('#groupNameExists()', function () {
		it('check if group exist -> true', function (done) {
			api.groupNameExists('test_group', function (res) {
				// console.log(res)
				assert.ok(res.success)
				assert.ok(res.data)
				done()
			})
		})
		it('check if group exist -> false', function (done) {
			api.groupNameExists('test_group_fail', function (res) {
				// console.log(res)
				assert.ok(res.success)
				assert.equal(res.data, false)
				done()
			})
		})
	})
})

let assert = require('assert')
let API = require('../src/api')

let api = new API('https://localhost:4447', 'opsi', 'opsi')

describe('Test OPSI API Groups Actions', function () {
	this.timeout(5000)
	let randomGroupName = 'testgroup_' + Math.floor((Math.random() * 500) + 1)
	// create group add/remove test client
	let tmpclient = 'grouptestclient'
	let tmpdomain = 'opsi.docker.lan'

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
					assert.ok(res.data)
					done()
				}
			)
		})

		it('FAILED: create group fail no parameter', function (done) {
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

	describe('#getHostGroupInfo()', function () {
		it('get group info', function (done) {
			api.getHostGroupInfo(randomGroupName, function (res) {
				// console.log(res)
				assert.ok(res.success)
				assert.ok(res.data instanceof Object, 'Object Expected')
				assert.deepStrictEqual(res.data.ident, randomGroupName, 'Group Name Expected')
				done()
			})
		})
	})


	describe('#getAllHostGroups()', function () {
		it('get all host groups list and its greater then zero', function (done) {
			api.getAllHostGroups(function (res) {
				assert.ok(res.success)
				assert.ok(res.data instanceof Array, 'Array Expected')
				// console.log(res.data)
				done()
			})
		})
	})

	describe('#groupNameExists()', function () {
		it('check if group exist -> true', function (done) {
			api.groupNameExists(randomGroupName, function (res) {
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


	describe('#addClientToGroup()', function () {
		// attention takes long time to success

		it('create a client and add the client to group', function (done) {

			// add client first
			api.createClient(tmpclient, tmpdomain, 'Test Client',
				'',
				'',
				'',
				function (client) {
					api.addClientToGroup(client.data, randomGroupName, function (res) {
						assert.ok(res.success)
						assert.ok(res.data)
						done()
					})
				})
		})

		it('FAILED: add none existent client to group', function (done) {
			api.addClientToGroup('foo', randomGroupName, function (res) {
				assert.ok(res.message)
				assert.equal(res.success, false)
				done()
			})
		})

		it('FAILED: add client to not existing group', function (done) {
			api.addClientToGroup(tmpclient + '.' + tmpdomain, 'foo', function (res) {
				assert.ok(res.message)
				assert.equal(res.success, false)
				done()
			})
		})
	})

	describe('#getGroupClients()', function () {
		it('get clients from group', function (done) {
			api.getGroupClients(randomGroupName, function (res) {
				// console.log(res)
				assert.ok(res.success)
				assert.ok(res.data instanceof Array, 'Array Expected')
				done()
			})
		})
	})

	describe('#removeClientFromGroup()', function () {
		it('remove client from group by id', function (done) {
			api.removeClientFromGroup(tmpclient + '.' + tmpdomain, randomGroupName, function (res) {
				// console.log(res)
				assert.ok(res.success)
				done()
			})
		})

		it('FAILED: remove client from not existent group by id', function (done) {
			api.removeClientFromGroup('', 'foo', function (res) {
				// console.log(res)
				assert.ok(res.message)
				assert.equal(res.success, false)
				done()
			})
		})
	})

	describe('#renameGroup()', function () {
		let testgroup = 'typo-group'
		let correctName = 'renamed-group-' + Math.floor((Math.random() * 500) + 1)
		it('create client rename one', function (done) {
			api.createHostGroup(
				testgroup,
				'',
				'',
				'',
				function () {
					api.renameGroup(testgroup, correctName, function (res) {
						assert.ok(res.success)
						assert.ok(res.data)
						done()
					})
				}
			)

		})

		it('FAILES: rename group', function (done) {
			api.renameGroup('foo', correctName, function (res) {
				// console.log(res)
				assert.equal(res.success, false)
				assert.ok(res.message)
				done()
			})
		})
	})

	describe('#deleteGroup()', function () {
		it('delete group by group name', function (done) {
			api.deleteGroup(randomGroupName, function (res) {
				assert.ok(res.success)
				assert.ok(res.data)
				done()
			})
		})
		it('FAILED: delete group by group name', function (done) {
			api.deleteGroup('', function (res) {
				assert.ok(res.message)
				assert.equal(res.success, false)
				done()
			})
		})
	})

})

import {expect, assert} from 'chai';
import {OPSIApi} from "../src/api";

describe('Test OPSI API Groups Actions', function () {
	this.timeout(5000)
	let randomGroupName = 'testgroup_' + Math.floor((Math.random() * 500) + 1)
	// create group add/remove test client
	let tmpclient = 'grouptestclient'
	let tmpdomain = 'opsi.docker.lan'
	let api = new OPSIApi('https://localhost:4447', 'opsi', 'opsi')

	describe('#createHostGroup()', function () {
		it('create group', async () => {
			const {success, data, message} = await api.createHostGroup( randomGroupName,
				'',
				'',
				'',
			)
			assert.isTrue(data)
			assert.isTrue(success)
		})

		it('FAILED: create group fail no parameter', async () => {
			const {success, data, message} = await api.createHostGroup(
				'',
				'',
				'',
				'',
			)
			assert.isFalse(data)
			assert.isString(message)
			assert.isFalse(success)
		})
	})

	describe('#getHostGroupInfo()', function () {
		it('get group info', async () => {
			const {success, data} = await api.getHostGroupInfo(randomGroupName)
			// console.log(res)
			assert.isTrue(success)
			assert.isObject(data)
			expect(data.ident).is.equal(randomGroupName)
		})
	})


	describe('#getAllHostGroups()', function () {
		it('get all host groups list and its greater then zero', async () => {
			const {success, data} = await api.getAllHostGroups()
			assert.isTrue(success)
			assert.isArray(data)
		})
	})

	describe('#groupNameExists()', function () {
		it('check if group exist -> true', async () => {
			const {success, data} = await api.groupNameExists(randomGroupName)
			assert.isTrue(data)
			assert.isTrue(success)
		})

		it('check if group exist -> false', async () => {
			const {success, data} = await api.groupNameExists('test_group_fail')
			assert.isFalse(data)
			assert.isTrue(success)
		})
	})


	describe('#addClientToGroup()', function () {
		// attention takes long time to success

		it('create a client and add the client to group', async () => {
			// add client first
			let client = await api.createClient(tmpclient, tmpdomain, 'Test Client',
				'',
				'',
				'')

			const {success, data} = await api.addClientToGroup(client.data, randomGroupName)
			assert.isTrue(data)
			assert.isTrue(success)
		})

		it('FAILED: add none existent client to group', async () => {
			const {success, data} = await api.addClientToGroup('foo', randomGroupName)
			assert.isFalse(data)
			assert.isFalse(success)
		})

		it('FAILED: add client to not existing group', async () => {
			const {success, data} = await api.addClientToGroup(tmpclient + '.' + tmpdomain, 'foo')
			assert.isFalse(data)
			assert.isFalse(success)
		})
	})

	describe('#getGroupClients()', function () {
		it('get clients from group', async () => {
			const {success, data} = await api.getGroupClients(randomGroupName)
			assert.isTrue(success)
			assert.isArray(data)
		})
	})

	describe('#removeClientFromGroup()', function () {
		it('remove client from group by id', async () => {
			const {success, data} = await api.removeClientFromGroup(tmpclient + '.' + tmpdomain, randomGroupName)
			assert.isTrue(data)
			assert.isTrue(success)
		})

		it('FAILED: remove client from not existent group by id', async () => {
			const {success, data, message} = await api.removeClientFromGroup(tmpclient + '.' + tmpdomain, 'foo')
			assert.isFalse(data)
			assert.isString(message)
			assert.isFalse(success)
		})

		it('FAILED: remove not existent client group', async () => {
			const {success, data, message} = await api.removeClientFromGroup('test.'+tmpdomain, randomGroupName)
			assert.isFalse(data)
			assert.isString(message)
			assert.isFalse(success)
		})
	})

	describe('#renameGroup()', function () {
		let testgroup = 'typo-group'
		let correctName = 'renamed-group-' + Math.floor((Math.random() * 500) + 1)
		it('create client rename one', async () => {
			let group = await api.createHostGroup(
				testgroup,
				'',
				'',
				'')
			const {success, data} = await api.renameGroup(testgroup, correctName)
			// console.log(data)
			assert.isTrue(data)
			assert.isTrue(success)
		})

		it('FAILES: rename group', async () => {
			const {success, data, message} = await api.renameGroup('foo', correctName)
			assert.isObject(data)
			assert.isString(message)
			assert.isFalse(success)
			expect(data.message).is.equal(message)
		})
	})

	describe('#deleteGroup()', function () {
		it('delete group by group name', async () => {
			const {success, data} = await api.deleteGroup(randomGroupName)
			assert.isTrue(data)
			assert.isTrue(success)
		})
		it('FAILED: delete group by group name', async () => {
			const {success, data, message} = await api.deleteGroup('')
			assert.isFalse(data)
			assert.isString(message)
			assert.isFalse(success)
		})
	})

})

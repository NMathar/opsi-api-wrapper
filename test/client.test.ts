import {expect, assert} from 'chai';
import {OPSIApi} from "../src/api";

describe('Test OPSI API Client Actions', function () {
    let api = new OPSIApi('https://localhost:4447', 'opsi', 'opsi')
    this.timeout(1000)
    let clientName = 'testclient-' + Math.floor((Math.random() * 500) + 1)
    let domain = 'opsi.docker.lan'

    describe('#createClient()', function () {
        it('create a new client', async () => {
            const {success, data, message} = await api.createClient(
                clientName,
                domain,
                'Test Client',
                '',
                '',
                '',
            )
            // console.log(data)
            assert.isOk(success)
            expect(data).to.equal(clientName + '.' + domain);
            assert.isEmpty(message)
        });

        it('create a new client fail no parameter', async () => {
            const {success, data, message} = await api.createClient('',
                '',
                '',
                '',
                '',
                '',
            )
            // console.log(message)
            assert.isFalse(data)
            assert.isFalse(success)
            assert.isString(message)
        });


        it('create a new client fail wrong name', async () => {
            const {success, data, message} = await api.createClient('Test Client',
                'this should fail',
                '',
                '',
                '',
                '',
            )
            // console.log(data)
            assert.isFalse(success)
            assert.isObject(data)
            assert.isString(message)
        });
    })

    describe('#getClientInfo()', function () {
        it('get client info', async () => {
            const {success, data} = await api.getClientInfo(clientName + '.' + domain)
            assert.isObject(data)
            assert.isTrue(success)
            expect(data.hostId).is.equal(clientName + '.' + domain)
        })

        it('get client info fail with valid domain', async () => {
            const {success, data, message} = await api.getClientInfo('test.'+domain)
            // console.log(message)
            assert.isObject(data)
            assert.isFalse(success)
            assert.isString(message)
        })

        it('get client info fail', async () => {
            const {success, data, message} = await api.getClientInfo('this shoul fail')
            // console.log(message)
            assert.isObject(data)
            assert.isFalse(success)
            assert.isString(message)
        })
    })


    describe('#getAllClients()', function () {
        it('get all client list and its greater then zero', async () => {
            const {success, data} = await api.getAllClients()
            assert.isArray(data)
            assert.isTrue(success)
            expect(data.length).is.greaterThan(0)
        })
    })

    describe('#renameClient()', function () {
        let testclient = 'typo-client'
        let correctName = 'renamed-client-' + Math.floor((Math.random() * 500) + 1)
        it('create client rename one', async () => {
            const newClient = await api.createClient(testclient,
                domain,
                'Test rename Client',
                '',
                '',
                '',
            )

            // console.log(newClient.data)

            const {success, data} = await api.renameClient(newClient.data, correctName + '.' + domain)
            // console.log(success)
            // console.log(data)
            assert.isTrue(success)
            assert.isTrue(data)
        })


        it('FAILES: rename', async () => {
            const {success, data, message} = await api.renameClient('foo', correctName + '.' + domain)
            // console.log(data)
            assert.isObject(data) // error data object
            assert.isFalse(success)
            assert.isString(message)
        })
    })

    describe('#deleteClient()', function () {
    	it('delete a client', async () => {
            const {success, data, message} = await api.deleteClient(
    			clientName + '.' + domain,)
            assert.isNull(data)
            assert.isTrue(success)
    	})

    	it('FAILED: delete a client', async () => {
            const {success, data, message} = await api.deleteClient(
    			'del_client_fail')
            assert.isObject(data)
            assert.isFalse(success)
            assert.isString(message)
    	})
    })


    // TODO: get software, hardware and product infos for one client

})

import { assert, expect } from 'chai';
import { OPSIApi } from '../src/api';

describe('Test OPSI API Client Actions', function() {
  const api = new OPSIApi('https://localhost:4447', 'opsi', 'opsi');
  this.timeout(5000);
  const clientName = 'testclient-' + Math.floor(Math.random() * 500 + 1);
  const domain = 'opsi.docker.lan';

  describe('#createClient()', () => {
    it('create a new client', async () => {
      const { success, data, message } = await api.createClient(clientName, domain, 'Test Client', '', '', '');
      // console.log(data)
      assert.isOk(success);
      expect(data).to.equal(clientName + '.' + domain);
      assert.isEmpty(message);
    });

    it('create a new client fail no parameter', async () => {
      const { success, data, message } = await api.createClient('', '', '', '', '', '');
      // console.log(message)
      assert.isFalse(data);
      assert.isFalse(success);
      assert.isString(message);
    });

    it('create a new client fail wrong name', async () => {
      const { success, data, message } = await api.createClient('Test Client', 'this should fail', '', '', '', '');
      // console.log(data)
      assert.isFalse(success);
      assert.isObject(data);
      assert.isString(message);
    });
  });


  describe('#updateClient()', () => {
    it('update client', async () => {
      const clientInfo = await api.getClientInfo(clientName + '.' + domain);
      clientInfo.data.note = 'Add note on Update';

      const { success, data, message } = await api.updateClient(clientInfo.data);
      // assert.isTrue(data);
      // console.log(data); // tslint:disable-line
      // console.log(message); // tslint:disable-line
      assert.isTrue(data);
      assert.isTrue(success);
    });
  });

  describe('#getClientInfo()', () => {
    it('get client info', async () => {
      const { success, data } = await api.getClientInfo(clientName + '.' + domain);
      // console.log(data) // tslint:disable-line
      assert.isObject(data);
      assert.isTrue(success);
      expect(data.id).is.equal(clientName + '.' + domain);
    });

    it('get client info fail with valid domain', async () => {
      const { success, data, message } = await api.getClientInfo('test.' + domain);
      assert.isFalse(data);
      assert.isFalse(success);
      assert.isString(message);
    });

    it('get client info fail', async () => {
      const { success, data, message } = await api.getClientInfo('this shoul fail');
      assert.isFalse(data);
      assert.isFalse(success);
      assert.isString(message);
    });
  });

  describe('#getAllClientData()', () => {
    it('get huge client object', async () => {
      // prepare test client with data

      const { success, data } = await api.getAllClientData(clientName + '.' + domain);
      // console.log(data) // tslint:disable-line
      assert.isObject(data);
      assert.isObject(data.hardware);
      assert.isObject(data.info);
      assert.isArray(data.products);

      assert.isTrue(success);
    });
  })

  describe('#getAllClients()', () => {
    it('get all client list and its greater then zero', async () => {
      const { success, data } = await api.getAllClients();
      // console.log(data) // tslint:disable-line
      assert.isArray(data);
      assert.isTrue(success);
      expect(data.length).is.greaterThan(0);
    });
  });

  describe('#renameClient()', () => {
    const testclient = 'typo-client';
    const correctName = 'renamed-client-' + Math.floor(Math.random() * 500 + 1);
    it('create client rename one', async () => {
      const newClient = await api.createClient(testclient, domain, 'Test rename Client', '', '', '');

      // console.log(newClient.data)

      const { success, data } = await api.renameClient(newClient.data, correctName + '.' + domain);
      // console.log(success)
      // console.log(data)
      assert.isTrue(success);
      assert.isTrue(data);
    });

    it('FAILES: rename', async () => {
      const { success, data, message } = await api.renameClient('foo', correctName + '.' + domain);
      // console.log(data)
      assert.isObject(data); // error data object
      assert.isFalse(success);
      assert.isString(message);
    });
  });

  describe('#deleteClient()', () => {
    it('delete a client', async () => {
      const { success, data, message } = await api.deleteClient(clientName + '.' + domain);
      assert.isNull(data);
      assert.isTrue(success);
    });

    it('FAILED: delete a client', async () => {
      const { success, data, message } = await api.deleteClient('del_client_fail');
      assert.isObject(data);
      assert.isFalse(success);
      assert.isString(message);
    });
  });
});

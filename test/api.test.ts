import { assert, expect } from 'chai';
import { OPSIApi } from '../src/api';

describe('Test OPSI API', function() {
  const api = new OPSIApi('https://localhost:4447', 'opsi', 'opsi');
  this.timeout(800);

  describe('#getOpsiVersion()', () => {
    it('is opsi version avaibale', async () => {
      const { success, data } = await api.getOpsiVersion();
      // console.log(data)
      assert.isOk(success);
    });
  });

  describe('#isAuthenticated()', () => {
    it('get boolean for is user authenticated', async () => {
      const { success, data } = await api.isAuthenticated();
      assert.isTrue(success);
      assert.isTrue(data);
    });
  });

  describe('#isUserAdmin()', () => {
    it('get boolean for is user admin', async () => {
      const { success, data } = await api.isUserAdmin();
      assert.isTrue(success);
      assert.isTrue(data);
    });
  });

  describe('#getServerID()', () => {
    it('more then zreo server id', async () => {
      const { success, data } = await api.getServerIDs();
      assert.isTrue(success);
      assert.isArray(data);
      expect(data.length).is.greaterThan(0);
    });
  });

  describe('#getOpsiServerInfo()', () => {
    it('get object woth server infos', async () => {
      const { success, data } = await api.getOpsiServerInfo();
      // console.log(data)
      assert.isTrue(success);
      assert.isArray(data);
      expect(data[0].type).is.equal('OpsiConfigserver');
    });
  });
});

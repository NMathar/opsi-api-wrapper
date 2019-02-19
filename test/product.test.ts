import { assert, expect } from 'chai';
import { OPSIApi } from '../src/api';

describe('Test OPSI API Product Actions', function() {
  const api = new OPSIApi('https://localhost:4447', 'opsi', 'opsi');
  const testProduct = 'swaudit';
  this.timeout(1000);

  describe('#getAllProducts()', () => {
    it('get all products', async () => {
      const { success, data } = await api.getAllProducts();
      assert.isTrue(success);
      // console.log(data); // tslint:disable-line
      assert.isArray(data);
    });
  });


  describe('#getAllActionsForProduct()', () => {
    it('get all actions for ' + testProduct, async () => {
      const server = await api.getServerIDs();
      // console.log(server.data); // tslint:disable-line
      const { success, data } = await api.getAllActionsForProduct(testProduct, server.data[0]);
      assert.isTrue(success);
      // console.log(data); // tslint:disable-line
      assert.isArray(data);
    });

    it('get all actions for not existent product', async () => {
      const server = await api.getServerIDs();
      // console.log(server.data); // tslint:disable-line
      const { success, data, message } = await api.getAllActionsForProduct('foo', server.data[0]);
      assert.isFalse(success);
      // console.log(data); // tslint:disable-line
      // console.log(message); // tslint:disable-line
      // assert.isArray(data);
      assert.isString(message);
    });

    it('get all actions product on not existent server', async () => {
      // console.log(server.data); // tslint:disable-line
      const { success, data, message } = await api.getAllActionsForProduct(testProduct, 5);
      assert.isFalse(success);
      // console.log(data); // tslint:disable-line
      // console.log(message); // tslint:disable-line
      // assert.isArray(data);
      assert.isString(message);
    });
  });

  describe('#getProductInfo()', () => {
    it('get product infos', async () => {
      const { success, data } = await api.getProductInfo(testProduct);
      assert.isTrue(success);
      assert.isObject(data);
      // console.log(data); // tslint:disable-line
    });

    it('get product infos for not existent product', async () => {
      const { success, message, data } = await api.getProductInfo('foo');
      assert.isFalse(success);
      assert.isObject(data);
      // error object
      // { message:
      //   'Backend missing data error: No product with id \'foo\' found',
      //     class: 'BackendMissingDataError' }
      assert.isString(message)
      // console.log(message); // tslint:disable-line
      // console.log(data); // tslint:disable-line
    });
  });
});

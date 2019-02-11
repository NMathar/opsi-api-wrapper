import { assert, expect } from 'chai';
import { OPSIApi } from '../src/api';

describe('Test OPSI API Product Actions', function() {
  const api = new OPSIApi('https://localhost:4447', 'opsi', 'opsi');
  const testProduct = 'swaudit'
  this.timeout(1000);

  // TODO: create product

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

  describe('#getAllProducts()', () => {
    it('get all products', async () => {
      const { success, data } = await api.getAllProducts();
      assert.isTrue(success);
      console.log(data); // tslint:disable-line
      assert.isArray(data);
    });
  });


  describe('#getAllActionsForProduct()', () => {
    it('get all actions for ' + testProduct, async () => {
      const server = await api.getServerIDs()
      // console.log(server.data); // tslint:disable-line
      const { success, data } = await api.getAllActionsForProduct(testProduct, server.data[0]);
      assert.isTrue(success);
      console.log(data); // tslint:disable-line
      assert.isArray(data);
    })
  })
});

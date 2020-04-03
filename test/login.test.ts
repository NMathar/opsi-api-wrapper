import { assert, expect, should } from 'chai';
import { OPSIApi } from '../src/api';

describe('Test OPSI API Login', function () {
  this.timeout(15000);

  describe('Api Login Fail', () => {
    it('Login Fail or connection problem', async () => {
      const api = new OPSIApi('https://localhost:4447', 'opsi', 'FAIL');
      // assert.isObject(api)
      const { success, message } = await api.getOpsiVersion();
      // console.error(message)
      // console.log(data)
      assert.isFalse(success);
    });

    it('Login Fail missing parameter', () => {
      should().throw(() => {
        new OPSIApi('https://localhost:4447', 'opsi', ''); // tslint:disable-line
      });
    });
  });

  describe('Api Login Success', () => {
    it('Login Success', () => {
      should().not.throw(() => {
        new OPSIApi('https://localhost:4447', 'opsi', 'opsi'); // tslint:disable-line
      });
    });
  });
});

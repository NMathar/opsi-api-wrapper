"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const api_1 = require("../src/api");
describe('Test OPSI API Product Actions', function () {
    const api = new api_1.OPSIApi('https://localhost:4447', 'opsi', 'opsi');
    const testProduct = 'swaudit';
    this.timeout(1000);
    describe('#getAllProducts()', () => {
        it('get all products', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.getAllProducts();
            chai_1.assert.isTrue(success);
            // console.log(data); // tslint:disable-line
            chai_1.assert.isArray(data);
        }));
    });
    describe('#getAllActionsForProduct()', () => {
        it('get all actions for ' + testProduct, () => __awaiter(this, void 0, void 0, function* () {
            const server = yield api.getServerIDs();
            // console.log(server.data); // tslint:disable-line
            const { success, data } = yield api.getAllActionsForProduct(testProduct, server.data[0]);
            chai_1.assert.isTrue(success);
            // console.log(data); // tslint:disable-line
            chai_1.assert.isArray(data);
        }));
    });
    describe('#getProductInfo()', () => {
        it('get product infos', () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield api.getProductInfo(testProduct);
            chai_1.assert.isTrue(success);
            chai_1.assert.isObject(data);
            // console.log(data); // tslint:disable-line
        }));
        it('get product infos for not existent product', () => __awaiter(this, void 0, void 0, function* () {
            const { success, message, data } = yield api.getProductInfo('foo');
            chai_1.assert.isFalse(success);
            chai_1.assert.isObject(data);
            // error object
            // { message:
            //   'Backend missing data error: No product with id \'foo\' found',
            //     class: 'BackendMissingDataError' }
            chai_1.assert.isString(message);
            // console.log(message); // tslint:disable-line
            // console.log(data); // tslint:disable-line
        }));
    });
});
//# sourceMappingURL=product.test.js.map
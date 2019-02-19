"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    /**
     * Get all products.
     *
     * @example
     * //returns array of all clients
     * api.getAllProducts()
     *
     * @returns {IfcResult} Data.
     */
    getAllProducts() {
        this.resetResult();
        return this.sendRequest('getProductIds_list', [], this.id);
    }
    /**
     * get Product infos
     *
     * @example
     * // returns an object of product data
     *
     * api.getProductInfo('swaudit')
     *
     * @param productId
     */
    getProductInfo(productId) {
        this.resetResult();
        return this.sendRequest('getProduct_hash', [productId], this.id);
    }
    /**
     * Get all actions for one product.
     *
     * @example
     * //returns array of actions for product
     * api.serverIDs()
     * api.actionsForProduct('', servers[0])
     *
     * @param {string} productid - Any id string.
     * @param {string } serverid - Serverid string that gets from serverIDs.
     * @returns {IfcResult} Data.
     */
    getAllActionsForProduct(productid, serverid) {
        return this.sendRequest('getPossibleProductActions_list', [productid, serverid], this.id);
    }
}
exports.Product = Product;
//# sourceMappingURL=product.js.map
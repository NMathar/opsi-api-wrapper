import { OPSIApi } from './api';
import { IfcResult } from './IfcResult';
declare class Product {
    /**
     * Get all products.
     *
     * @example
     * //returns array of all clients
     * api.getAllProducts()
     *
     * @returns {IfcResult} Data.
     */
    getAllProducts(this: OPSIApi): Promise<IfcResult>;
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
    getProductInfo(this: OPSIApi, productId: any): Promise<IfcResult>;
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
    getAllActionsForProduct(this: OPSIApi, productid: string, serverid: number): Promise<IfcResult>;
}
export { Product };

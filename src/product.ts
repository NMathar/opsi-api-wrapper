import { OPSIApi } from './api';
import { IfcResult } from './IfcResult';

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
  public getAllProducts(this: OPSIApi): Promise<IfcResult> {
    this.resetResult();
    return this.sendRequest('getProductIds_list', [], this.id);
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
  public getAllActionsForProduct(this: OPSIApi ,productid: string, serverid: number): Promise<IfcResult> {
      return this.sendRequest('getPossibleProductActions_list', [productid, serverid], this.id)
  }
}

export { Product };

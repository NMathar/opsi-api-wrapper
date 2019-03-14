import { OPSIApi } from '../api';
import { IfcResult } from '../interfaces/IfcResult';

class Product {
  /**
   * Get all installed products from opsi depot.
   *
   * @example
   * ```typescript
   * const { success, data, message } = await api.getAllProducts()
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // array of opsi products
   * ```
   *
   * @returns {IfcResult} Data.
   */
  public getAllProducts(this: OPSIApi): Promise<IfcResult> {
    this.resetResult();
    return this.sendRequest('product_getObjects', [], this.id);
  }

  /**
   * get detailed Product infos
   *
   * @example
   * ```typescript
   * const { success, data, message } = await api.getProductInfo('swaudit')
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // object of detailed product information
   * ```
   *
   * @param productId
   */
  public async getProductInfo(this: OPSIApi, productId): Promise<IfcResult> {
    this.resetResult();

    const result = await this.sendRequest(
      'product_getObjects',
      [
        '',
        {
          id: productId,
        },
      ],
      this.id,
    );

    return this.returnOneResult(result, 'product not found!');
  }

  /**
   * Get all actions for one product.
   *
   * @example
   * ```typescript
   * const server = await api.getServerIDs();
   * const { success, data, message } = await api.getAllActionsForProduct('swaudit', server.data[0]);
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // array of product actions
   * ```
   * api.serverIDs()
   * api.actionsForProduct('', servers[0])
   *
   * @param {string} productid - Any id string.
   * @param {string } serverid - Serverid string that gets from serverIDs.
   * @returns {IfcResult} Data.
   */
  public getAllActionsForProduct(this: OPSIApi, productid: string, serverid: number): Promise<IfcResult> {
    return this.sendRequest('getPossibleProductActions_list', [productid, serverid], this.id);
  }

  /**
   * Get all clients with outdated software version for one product.
   *
   * @example
   * ```typescript
   * const { success, data, message } = await api.getClientsWithOutdatedVersion('swaudit');
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // array of client ids
   * ```
   *
   * @param {string} productid - Any id string.
   * @returns {IfcResult} Data.
   */
  public getClientsWithOutdatedVersion(this: OPSIApi, productid: string): Promise<IfcResult> {
    return this.sendRequest('getClientsWithOutdatedProduct', [productid], this.id);
  }

  /**
   * Update clients with outdated software.
   *
   * @example
   * ```typescript
   * const { success, data, message } = await api.updateOutdatedClients('swaudit');
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // array of client ids
   * ```
   *
   * @param {string} productid - Any id string.
   * @returns {IfcResult} Data.
   */
  public updateOutdatedClients(this: OPSIApi, productid: string): Promise<IfcResult> {
    // could this work better -> setActionRequestWhereOutdatedWithDependencies ???
    return this.sendRequest('setActionRequestWhereOutdated', [productid], this.id);
  }
}

export { Product };

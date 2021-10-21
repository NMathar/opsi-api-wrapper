import axios, { AxiosError } from 'axios';
import { Client } from './implements/client';
import { Group } from './implements/group';
import { Product } from './implements/product';
import { IfcOPSIResult } from './interfaces/IfcOPSIResult';
import { IfcResult } from './interfaces/IfcResult';

/**
 * Class OPSIApi
 */
class OPSIApi implements Client, Group, Product {
  public apiURL: string;

  public username: string;

  public password: string;

  public id: number;

  public res: IfcResult;

  // ########### client actions

  public getAllClients = Client.prototype.getAllClients;

  public createClient = Client.prototype.createClient;

  public updateClient = Client.prototype.updateClient;

  public getClientInfo = Client.prototype.getClientInfo;

  public getClientGroups = Client.prototype.getClientGroups;

  public getClientHardware = Client.prototype.getClientHardware;

  public getClientSoftware = Client.prototype.getClientSoftware;

  public getClientProducts = Client.prototype.getClientProducts;

  public getClientProductsInstallationStatus = Client.prototype.getClientProductsInstallationStatus;

  public getClientDetails = Client.prototype.getClientDetails;

  public renameClient = Client.prototype.renameClient;

  public deleteClient = Client.prototype.deleteClient;

  public getLoggedInUser = Client.prototype.getLoggedInUser;

  public isClientOn = Client.prototype.isClientOn;

  public getClientLogs = Client.prototype.getClientLogs;

  public getInstallableProductIds = Client.prototype.getInstallableProductIds;

  public getUptimeClient = Client.prototype.getUptimeClient;

  // untested client actions

  public fireEventForClient = Client.prototype.fireEventForClient;

  public rebootClient = Client.prototype.rebootClient;

  public shutdownClient = Client.prototype.shutdownClient;

  public startClient = Client.prototype.startClient;

  public sendPopupMessageToClient = Client.prototype.sendPopupMessageToClient;

  public callActionForProductOnClient = Client.prototype.callActionForProductOnClient;

  public setClientConfigObject = Client.prototype.setClientConfigObject;

  public removeClientConfigObject = Client.prototype.removeClientConfigObject;

  public setUefiBoot = Client.prototype.setUefiBoot;

  public unsetUefiBoot = Client.prototype.unsetUefiBoot;

  public getClientObjectConfigs = Client.prototype.getClientObjectConfigs;

  public getClientObjectConfig = Client.prototype.getClientObjectConfig;

  public uefiBootEnabled = Client.prototype.uefiBootEnabled;

  // ########### Group actions

  public getAllHostGroups = Group.prototype.getAllHostGroups;

  public getAllHostGroupsWithClients = Group.prototype.getAllHostGroupsWithClients;

  public createHostGroup = Group.prototype.createHostGroup;

  public updateHostGroup = Group.prototype.updateHostGroup;

  public getHostGroupInfo = Group.prototype.getHostGroupInfo;

  public groupNameExists = Group.prototype.groupNameExists;

  public addClientToGroup = Group.prototype.addClientToGroup;

  public getGroupClients = Group.prototype.getGroupClients;

  public removeClientFromGroup = Group.prototype.removeClientFromGroup;

  public renameGroup = Group.prototype.renameGroup;

  public deleteGroup = Group.prototype.deleteGroup;

  // ########### Product actions

  public getAllProducts = Product.prototype.getAllProducts;

  public getAllActionsForProduct = Product.prototype.getAllActionsForProduct;

  public getProductInfo = Product.prototype.getProductInfo;

  public getClientsWithOutdatedVersion = Product.prototype.getClientsWithOutdatedVersion;

  public updateOutdatedClients = Product.prototype.updateOutdatedClients;

  /**
   * Create/Initiate OPSIApi.
   *
   * @param {string} apiURL - OPSI Api URL String Example: Https://opsiserver:4447.
   * @param {string} username - OPSI user with access rights.
   * @param {string} password - Password of the api user.
   * @param {int} id - OPSI Api Server ID. Default is 1
   */
  constructor(apiURL: string, username: string, password: string, id: number = 1) {
    if (!apiURL || !username || !password) {
      throw new Error('Please define all constructor variables!');
    }

    this.res = this.resetResult();
    this.apiURL = apiURL;
    this.username = username;
    this.password = password;
    this.id = id;
  }

  // ########### base api call functions

  /**
   * Get opsi version or false.
   *
   * @example
   * // returns a string of the opsi version or false
   * api.getOpsiVersion()
   *
   * @returns {IfcResult} Data.
   */
  public getOpsiVersion(): Promise<IfcResult> {
    this.resetResult();
    return this.sendRequest('backend_info', [], this.id);
  }

  /**
   * Get all server ids.
   *
   * @example
   * // returns array of server ids
   * api.serverIDs()
   *
   * @returns {IfcResult} Data.
   */
  public getServerIDs(): Promise<IfcResult> {
    this.resetResult();
    return this.sendRequest('getServerIds_list', [], this.id);
  }

  /**
   * Is api user authenticated.
   *
   * @example
   * // returns boolean if user is logged in or not
   * api.isAuthenticated()
   *
   * @returns {IfcResult} Data.
   */
  public isAuthenticated(): Promise<IfcResult> {
    this.resetResult();
    return this.sendRequest('accessControl_authenticated', [], this.id);
  }

  /**
   * Is api user admin.
   *
   * @example
   * // returns if user has admin rights
   * api.isUserAdmin()
   *
   * @returns {IfcResult} Data.
   */
  public isUserAdmin(): Promise<IfcResult> {
    this.resetResult();
    return this.sendRequest('accessControl_userIsAdmin', [], this.id);
  }

  /**
   * Get server infos.
   *
   * @example
   * // returns array with objects of server data
   * api.getOpsiServerInfo()
   *
   * @returns {IfcResult} Data.
   */
  public getOpsiServerInfo(): Promise<IfcResult> {
    this.resetResult();
    return this.sendRequest(
      'host_getObjects',
      [
        '',
        {
          type: 'OpsiConfigserver',
        },
      ],
      this.id,
    );
  }

  // ########### Helper

  /**
   * manipulate the result to an error or to one return object
   *
   * @param {IfcResult} result - IfcResult to manipulate
   * @param {string} notFoundMessage - message string that returns if result is empty
   * @returns {IfcResult} - nice IfcResult with useful data
   */
  public returnOneResult(result, notFoundMessage): IfcResult {
    if (result.success && result.data.length > 0) {
      result.data = result.data[0];
    } else {
      this.resetResult();
      this.res.message = notFoundMessage;
      return this.res;
    }
    return result;
  }

  public reduceReturnClientObject(result, clientId): IfcResult {
    this.resetResult();
    if (result.success && result.data[clientId].result !== null) {
      this.res.data = result.data[clientId];
    } else if (result.data[clientId].result === null) {
      this.res.data = result.data[clientId].result;
      this.res.message = result.data[clientId].error;
      this.res.success = false;
    } else {
      this.res = result;
    }
    return this.res;
  }

  /**
   * Generate api call actions.
   *
   * @param {string} method - Api function name to call.
   * @param {Array} params - Array of method parameters.
   * @param {number} id - Id number.
   * @private
   */
  public async sendRequest(method: string, params: any[], id: number): Promise<IfcResult> {
    this.resetResult();
    const url = `${this.apiURL}/rpc`;

    // add support for self signet certificate
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    try {
      const response = await axios.post(
        url,
        JSON.stringify({
          id,
          method,
          params,
        }),
        {
          headers: {
            Authorization: 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64'),
            'Content-Type': 'application/json',
          },
        },
      );
      const result = response.data as IfcOPSIResult;
      if (!result.error) {
        this.res = { success: true, data: result.result, message: '' };
      } else {
        this.res = { success: false, data: result.error, message: result.error.message };
      }

      return this.res;
    } catch (error: any | AxiosError) {
      this.res = { success: false, data: error, message: error.message };
      return this.res;
    }
  }

  // ########### Host actions

  /**
   * //TODO: host actions
   */

  protected resetResult() {
    return (this.res = { success: false, data: false, message: '' });
  }
}

export { OPSIApi };

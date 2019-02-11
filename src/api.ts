import * as request from 'request-promise';
import { Client } from './client';
import { Group } from './group';
import { IfcResult } from './IfcResult';
import { Product} from './product';

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

  public getClientInfo = Client.prototype.getClientInfo;

  public getAllClientData = Client.prototype.getAllClientData;

  public renameClient = Client.prototype.renameClient;

  public deleteClient = Client.prototype.deleteClient;

  //
  //
  // clientReboot(clientId, callback) {
  //     if (!clientId || clientId === '')
  //         return callback({success: false, message: 'Please define a clientId!'})
  //
  //     this.sendRequest('hostControl_reboot', [
  //         clientId
  //     ], this.id, function (data) {
  //         // console.log(data.message)
  //         return callback(data.message ? data : {success: true, data: true})
  //     })
  // }

  // ########### Group actions

  public getAllHostGroups = Group.prototype.getAllHostGroups;

  public createHostGroup = Group.prototype.createHostGroup;

  public getHostGroupInfo = Group.prototype.getHostGroupInfo;

  public groupNameExists = Group.prototype.groupNameExists;

  public addClientToGroup = Group.prototype.addClientToGroup;

  public getGroupClients = Group.prototype.getGroupClients;

  public removeClientFromGroup = Group.prototype.removeClientFromGroup;

  public renameGroup = Group.prototype.renameGroup;

  public deleteGroup = Group.prototype.deleteGroup;


  // ########### Product actions

  public getAllProducts = Product.prototype.getAllProducts

  public getAllActionsForProduct = Product.prototype.getAllActionsForProduct

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
    const options: any = {
      auth: {
        pass: this.password,
        sendImmediately: false,
        user: this.username,
      },
      json: {
        id,
        method,
        params,
      },
      rejectUnauthorized: false,
      uri: url,
    };

    await request
      .post(options)
      .then(body => {
        if (!body.error) {
          this.res = { success: true, data: body.result, message: '' };
        } else {
          this.res = { success: false, data: body.error, message: body.error.message };
        }
      })
      .catch(err => {
        this.res = { success: false, data: err, message: err.error.error.message ? err.error.error.message : 'Error' };
      });

    return this.res;
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

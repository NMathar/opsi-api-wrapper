import { OPSIApi } from '../api';
import { EHostType, IfcHost } from '../interfaces/IfcHost';
import { IfcResult } from '../interfaces/IfcResult';

class Client {
  /**
   * Get all clients.
   *
   * @example
   * ```typescript
   * //returns array of all clients
   * const { success, data, message } = await api.getAllClients()
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // returns array of client objects or an error object on fail
   * [ { ident: 'client01.opsi.lan',
   *     description: 'Description',
   *     created: '2019-02-18 18:50:33',
   *     inventoryNumber: '',
   *     ipAddress: null,
   *     notes: '',
   *     oneTimePassword: null,
   *     lastSeen: '2019-02-18 18:50:33',
   *     hardwareAddress: null,
   *     opsiHostKey: '8b3ffde7170a25d48104141786ad9ba2',
   *     type: 'OpsiClient',
   *     id: 'client01.opsi.lan' } ]
   * ```
   *
   * @returns {IfcResult} Object with result data
   */
  public getAllClients(this: OPSIApi): Promise<IfcResult> {
    this.resetResult();
    return this.sendRequest(
      'host_getObjects',
      [
        '',
        {
          type: EHostType.OpsiClient,
        },
      ],
      this.id,
    );
  }

  /**
   * create client.
   *
   * @example
   * ```typescript
   * //returns client id name in data
   * const { success, data, message } = await api.createClient('client01', 'opsi.lan', 'Description', 'Client notes', '192.168.0.1', 'xx:xx:xx:xx:xx:01')
   * console.log(data) // returns client01.opsi.lan or an error object on fail
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * ```
   *
   * @param {string} clientName - Client Name
   * @param {string} domain - Client domain
   * @param {string} description - description of the client
   * @param {string} notes - Notes for this client
   * @param {string} ipAddress - Client IP Address
   * @param {string} hardwareAddress - physical address of the client
   * @returns {IfcResult} Object with result data
   */
  public async createClient(
    this: OPSIApi,
    clientName: string,
    domain: string = '',
    description: string = '',
    notes: string = '',
    ipAddress: string = '',
    hardwareAddress: string = '',
  ): Promise<IfcResult> {
    this.resetResult();
    if (!clientName || clientName === '') {
      this.res.message = 'Please define a client name!';
      return this.res;
    }

    return await this.sendRequest(
      'createClient',
      [clientName, domain, description, notes, ipAddress, hardwareAddress],
      this.id,
    );
  }

  /**
   * update client
   *
   * @example
   * ```typescript
   * //returns boolean only on super bad data it will return an error message
   * const { success, data, message } = await api.updateClient(
   * {ident: 'client01.opsi.lan', note: 'add update note'}
   * )
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // data returns also true or an error object on fail
   * ```
   *
   * @param {Object} clientObject - group object with ident key
   * @returns {IfcResult} Object with result data
   */
  public async updateClient(this: OPSIApi, clientObject: IfcHost): Promise<IfcResult> {
    this.resetResult();

    const result = await this.sendRequest('host_updateObject', [clientObject], this.id);

    if (result.message === '' || !result.message) {
      return { success: true, message: '', data: true };
    }

    return result;
  }

  /**
   * get client info
   *
   * @example
   * ```typescript
   * //returns object with client info
   * const { success, data, message } = await api.getClientInfo('client01.opsi.lan',)
   * console.log(data) // returns
   * { ident: 'client01.opsi.lan',
   *  description: 'Description',
   *  created: '2019-02-19 18:11:10',
   *   inventoryNumber: '',
   *   ipAddress: null,
   *   notes: '',
   *   oneTimePassword: null,
   *   lastSeen: '2019-02-19 18:11:10',
   *   hardwareAddress: null,
   *   opsiHostKey: 'c748d0b0d2015dfda0306dc0a862a612',
   *   type: 'OpsiClient',
   *   id: 'client01.opsi.lan' }
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * ```
   *
   * @param {string} clientId - Client ID Name
   * @returns {IfcResult} Object with result data
   */
  public async getClientInfo(this: OPSIApi, clientId: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    const result = await this.sendRequest(
      'host_getObjects',
      [
        '',
        {
          id: clientId,
          type: EHostType.OpsiClient,
        },
      ],
      this.id,
    );

    return this.returnOneResult(result, 'client not found!');
  }

  /**
   * get all groups for one client. if client not exists it will return
   * also true and an empty array
   *
   * @example
   * ```typescript
   * const { success, data, message } = await api.getClientGroups('client01.opsi.lan')
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // data returns a array of groups or an empty array
   * ```
   *
   * @param clientId
   * @returns {IfcResult} Object with result data
   */
  public async getClientGroups(this: OPSIApi, clientId: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    return await this.sendRequest(
      'objectToGroup_getObjects',
      [
        '',
        {
          groupType: 'HostGroup',
          objectId: clientId,
        },
      ],
      this.id,
    );
  }

  /**
   * if hwaudit is successfully ran on this client you will get a huge object of hardware
   * information
   *
   * @example
   * ```typescript
   * const { success, data, message } = await api.getClientHardware('client01.opsi.lan')
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // data returns a object of hardware information or an empty object
   * ```
   *
   * @param clientId
   * @returns {IfcResult} Object with result data
   */
  public async getClientHardware(this: OPSIApi, clientId: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    return await this.sendRequest('getHardwareInformation_hash', [clientId], this.id);
  }

  /**
   * if swaudit is successfully ran on this client you will get a huge array of software
   * information.
   *
   * @example
   * ```typescript
   * const { success, data, message } = await api.getClientSoftware('client01.opsi.lan')
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // data returns a array of software information or an empty array
   * ```
   *
   * @param clientId
   * @returns {IfcResult} Object with result data
   */
  public async getClientSoftware(this: OPSIApi, clientId: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    return this.sendRequest(
      'auditSoftwareOnClient_getObjects',
      [clientId],
      this.id,
    );
  }


  /**
   * get all installed and not installed opsi product for client
   *
   * @example
   * ```typescript
   * const { success, data, message } = await api.getClientProducts('client01.opsi.lan')
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // data returns a array of product information or an empty array
   * ```
   *
   * @param clientId
   * @returns {IfcResult} Object with result data
   */
   public async getClientProducts(this: OPSIApi, clientId: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    return this.sendRequest(
      'getProductInstallationStatus_listOfHashes',
      [clientId],
      this.id,
    );
  }

  /**
   * get full client details
   *
   * @example
   * ```typescript
   * const { success, data, message } = await api.getClientDetails('client01.opsi.lan')
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // data returns a huge object with relevant client data
   * // object structure
   * {
   *   groups: [],
   *   hardware: {},
   *   info: {},
   *   products: {}
   * };
   * ```
   *
   * @param clientId
   * @returns {IfcResult} Object with result data
   */
  public async getClientDetails(this: OPSIApi, clientId: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    const baseInfo = await this.getClientInfo(clientId);

    const software = await this.getClientSoftware(clientId);

    const products = await this.getClientProducts(clientId)

    const hardware = await this.getClientHardware(clientId);

    const groups = await this.getClientGroups(clientId);

    this.res.data = {
      groups: groups.data,
      hardware: hardware.data,
      info: baseInfo.data,
      products: products.data,
      software: software.data
    };
    return this.res;
  }

  /**
   * rename a client
   *
   * @example
   * ```typescript
   * //returns boolean only on super bad data it will return an error message
   * const { success, data, message } = await api.renameClient('client01.opsi.lan', 'client01-renamed.opsi.lan')
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // data returns also true or an error object on fail
   * ```
   *
   * @param {string} name old id of the client
   * @param {string} newname new id
   * @returns {IfcResult} Object with result data
   */
  public async renameClient(this: OPSIApi, name: string, newname: string): Promise<IfcResult> {
    this.resetResult();
    const result = await this.sendRequest('host_renameOpsiClient', [name, newname], this.id);

    if (result.message === '' || !result.message) {
      return { success: true, message: '', data: true };
    }

    return result;
  }

  /**
   * delete one client by id.
   *
   * @example
   * ```typescript
   * //returns boolean only on super bad data it will return an error message
   * const { success, data, message } = await api.delete(clientId)
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // data returns null on success or an error object on fail
   * ```
   *
   * @param {string} clientId - Client ID
   * @returns {IfcResult} Object with result data
   */
  public async deleteClient(this: OPSIApi, clientId: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    return await this.sendRequest('deleteClient', [clientId], this.id);
  }

  /**
   * get the update in seconds from client
   *
   * @param clientId
   * @returns {IfcResult} Object with result data
   */
  public async getUptimeClient(this: OPSIApi, clientId: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    const result = await this.sendRequest('hostControlSafe_uptime', [clientId], this.id);

    return this.reduceReturnClientObject(result, clientId);
  }

  /**
   * get logged in user data
   *
   * @param clientId
   * @returns {IfcResult} Object with result data
   */
  public async getLoggedInUser(this: OPSIApi, clientId: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    const result = await this.sendRequest('hostControlSafe_getActiveSessions', [clientId], this.id);

    return this.reduceReturnClientObject(result, clientId);
  }

  /**
   * get all installable software packages for one client
   *
   * @param clientId
   * @returns {IfcResult} Object with result data
   */
  public async getInstallableProductIds(this: OPSIApi, clientId: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    return await this.sendRequest('getInstallableProductIds_list', [clientId], this.id);
  }

  /**
   * get logs for client. some possible log data
   * instlog (opsi-winst), clientconnect (opsiclientd), userlogin, bootimage and opsiconfd
   *
   * @param clientId
   * @param logType
   * @returns {IfcResult} Object with result data
   */
  public async getClientLogs(this: OPSIApi, clientId: string, logType: string = 'instlog'): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    return await this.sendRequest('readLog', [logType, clientId], this.id);
  }

  // ########################################
  //
  //          client actions
  //
  // ########################################

  // public async getProductActionRequests(this: OPSIApi, clientId): Promise<IfcResult>{
  //   this.resetResult()
  //   if (!clientId || clientId === '') {
  //     this.res.message = 'Please define a client ID!';
  //     return this.res;
  //   }
  //
  //   return await this.sendRequest('getProductActionRequests_listOfHashes', [clientId], this.id);
  // }

  /**
   * triggers a reboot command on the given clientId
   *
   * @param clientId
   * @returns {IfcResult} Object with result data
   */
  public async rebootClient(this: OPSIApi, clientId: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    return await this.sendRequest('hostControlSafe_reboot', [clientId], this.id);
  }

  /**
   * triggers a shutdown command on the given clientId
   *
   * @param clientId
   * @returns {IfcResult} Object with result data
   */
  public async shutdownClient(this: OPSIApi, clientId: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    return await this.sendRequest('hostControlSafe_shutdown', [clientId], this.id);
  }

  /**
   * triggers a wake-on-lan command from the opsi server to the given clientId. Wake on Lan
   * needs to be activated and the client.
   *
   * @param clientId
   * @returns {IfcResult} Object with result data
   */
  public async startClient(this: OPSIApi, clientId: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    return await this.sendRequest('hostControlSafe_start', [clientId], this.id);
  }

  /**
   * sent a popup message to the client that appears instantly on the client desktop.
   *
   * @param clientId
   * @param message
   * @returns {IfcResult} Object with result data
   */
  public async sendPopupMessageToClient(this: OPSIApi, clientId: string, message: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    return await this.sendRequest('hostControlSafe_showPopup', [message, clientId], this.id);
  }

  /**
   * set an action request for the given product and the given client.
   *
   * @param clientId
   * @param productId
   * @param action
   * @returns {IfcResult} Object with result data
   */
  public async callActionForProductOnClient(
    this: OPSIApi,
    clientId: string,
    productId: string,
    action: string,
  ): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '' || productId === '' || !productId) {
      this.res.message = 'Please define a client ID and a product ID!';
      return this.res;
    }

    return await this.sendRequest('setProductActionRequest', [productId, clientId, action], this.id);
  }

  /**
   * is client on or off
   *
   * @param clientId
   * @returns {IfcResult} Object with result data
   */
  public async isClientOn(this: OPSIApi, clientId: string): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    return await this.sendRequest('hostControlSafe_reachable', [clientId], this.id);
  }
}

export { Client };

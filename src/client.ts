import { OPSIApi } from './api';
import { IfcResult } from './IfcResult';

class Client {
  /**
   * Get all clients.
   *
   * @example
   * //returns array of all clients
   * api.getAllClients()
   *
   * @returns {Array} Data.
   */
  public getAllClients(this: OPSIApi): Promise<IfcResult> {
    this.resetResult();
    return this.sendRequest('getClientIds_list', [], this.id);
  }

  /**
   * create client.
   *
   * @example
   * //returns client id name
   * api.createClient(clientName, domain, description, notes, ipAddress, hardwareAddress)
   *
   * @param {string} clientName - Client Name
   * @param {string} domain - Client domain
   * @param {string} description - description of the client
   * @param {string} notes - Notes for this client
   * @param {string} ipAddress - Client IP Address
   * @param {string} hardwareAddress - physical address of the client
   * @returns {Array|Object} Data Array or Object with error message (Object.message).
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

    // let res: Result = {success: false, data: {}, message: 'empty'};

    return await this.sendRequest(
      'createClient',
      [clientName, domain, description, notes, ipAddress, hardwareAddress],
      this.id,
    );
  }

  /**
   * get client info
   *
   * @example
   * //returns object with client info
   * api.getClientInfo('clientId',)
   * @param {string} clientId - Client ID Name
   * @returns {Object} Object of client data.
   */
  public async getClientInfo(this: OPSIApi, clientId): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    return await this.sendRequest('getHost_hash', [clientId], this.id);
  }

  /**
   *
   * @param clientId
   */
  public async getAllClientData(this: OPSIApi, clientId): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    const baseInfo = await this.sendRequest('getHost_hash', [clientId], this.id);

    this.res.data = {
      info: baseInfo,
    };
    return this.res;
  }

  /**
   *
   * @example
   * //returns boolean only on super bad data it will return an error message
   *
   * api.renameClient(name, newname)
   *
   * @param {string} name old id of the client
   * @param {string} newname id
   * @returns {Boolean|Object} Boolean or Object with error message (Object.message).
   */
  public async renameClient(this: OPSIApi, name, newname): Promise<IfcResult> {
    this.resetResult();
    const result = await this.sendRequest('host_renameOpsiClient', [name, newname], this.id);

    if (result.message === '' || !result.message) {
      return { success: true, message: '', data: true };
    }

    return result;
  }

  /**
   * delete client.
   *
   * @example
   * //returns boolean only on super bad data it will return an error message
   *
   * api.delete(clientId)
   * @param {string} clientId - Client ID
   * @returns {Boolean|Object} Boolean or Object with error message (Object.message).
   */
  public async deleteClient(this: OPSIApi, clientId): Promise<IfcResult> {
    this.resetResult();
    if (!clientId || clientId === '') {
      this.res.message = 'Please define a client ID!';
      return this.res;
    }

    return await this.sendRequest('deleteClient', [clientId], this.id);
  }
}

export { Client };

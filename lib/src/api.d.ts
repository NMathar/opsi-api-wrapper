import { Client } from './client';
import { Group } from './group';
import { IfcResult } from './IfcResult';
import { Product } from './product';
/**
 * Class OPSIApi
 */
declare class OPSIApi implements Client, Group, Product {
    apiURL: string;
    username: string;
    password: string;
    id: number;
    res: IfcResult;
    getAllClients: (this: OPSIApi) => Promise<IfcResult>;
    createClient: (this: OPSIApi, clientName: string, domain?: string, description?: string, notes?: string, ipAddress?: string, hardwareAddress?: string) => Promise<IfcResult>;
    getClientInfo: (this: OPSIApi, clientId: any) => Promise<IfcResult>;
    getAllClientData: (this: OPSIApi, clientId: any) => Promise<IfcResult>;
    renameClient: (this: OPSIApi, name: any, newname: any) => Promise<IfcResult>;
    deleteClient: (this: OPSIApi, clientId: any) => Promise<IfcResult>;
    getAllHostGroups: (this: OPSIApi) => Promise<IfcResult>;
    createHostGroup: (this: OPSIApi, groupName: any, members?: string, description?: string, parentGroupId?: string) => Promise<IfcResult>;
    getHostGroupInfo: (this: OPSIApi, groupName?: string) => Promise<IfcResult>;
    groupNameExists: (this: OPSIApi, groupName: any) => Promise<IfcResult>;
    addClientToGroup: (this: OPSIApi, clientId: any, groupId: any) => Promise<IfcResult>;
    getGroupClients: (this: OPSIApi, groupId: any) => Promise<IfcResult>;
    removeClientFromGroup: (this: OPSIApi, clientId: any, groupId: any) => Promise<IfcResult>;
    renameGroup: (this: OPSIApi, name: any, newname: any) => Promise<IfcResult>;
    deleteGroup: (this: OPSIApi, groupId: any) => Promise<IfcResult>;
    getAllProducts: (this: OPSIApi) => Promise<IfcResult>;
    getAllActionsForProduct: (this: OPSIApi, productid: string, serverid: number) => Promise<IfcResult>;
    getProductInfo: (this: OPSIApi, productId: any) => Promise<IfcResult>;
    /**
     * Create/Initiate OPSIApi.
     *
     * @param {string} apiURL - OPSI Api URL String Example: Https://opsiserver:4447.
     * @param {string} username - OPSI user with access rights.
     * @param {string} password - Password of the api user.
     * @param {int} id - OPSI Api Server ID. Default is 1
     */
    constructor(apiURL: string, username: string, password: string, id?: number);
    /**
     * Get opsi version or false.
     *
     * @example
     * // returns a string of the opsi version or false
     * api.getOpsiVersion()
     *
     * @returns {IfcResult} Data.
     */
    getOpsiVersion(): Promise<IfcResult>;
    /**
     * Get all server ids.
     *
     * @example
     * // returns array of server ids
     * api.serverIDs()
     *
     * @returns {IfcResult} Data.
     */
    getServerIDs(): Promise<IfcResult>;
    /**
     * Is api user authenticated.
     *
     * @example
     * // returns boolean if user is logged in or not
     * api.isAuthenticated()
     *
     * @returns {IfcResult} Data.
     */
    isAuthenticated(): Promise<IfcResult>;
    /**
     * Is api user admin.
     *
     * @example
     * // returns if user has admin rights
     * api.isUserAdmin()
     *
     * @returns {IfcResult} Data.
     */
    isUserAdmin(): Promise<IfcResult>;
    /**
     * Get server infos.
     *
     * @example
     * // returns array with objects of server data
     * api.getOpsiServerInfo()
     *
     * @returns {IfcResult} Data.
     */
    getOpsiServerInfo(): Promise<IfcResult>;
    /**
     * Generate api call actions.
     *
     * @param {string} method - Api function name to call.
     * @param {Array} params - Array of method parameters.
     * @param {number} id - Id number.
     * @private
     */
    sendRequest(method: string, params: any[], id: number): Promise<IfcResult>;
    /**
     * //TODO: host actions
     */
    protected resetResult(): {
        success: false;
        data: boolean;
        message: string;
    };
}
export { OPSIApi };

import { OPSIApi } from './api';
import { IfcResult } from './IfcResult';
declare class Client {
    /**
     * Get all clients.
     *
     * @example
     * //returns array of all clients
     * const { success, data, message } = await api.getAllClients()
     * console.log(data) // returns array of clients or an error object on fail
     * console.log(success) // if all data are ok then this should return true else false
     * console.log(message) // message is empty if success is true. if success is false there is a error message
     *
     * @returns {IfcResult} Object with result data
     */
    getAllClients(this: OPSIApi): Promise<IfcResult>;
    /**
     * create client.
     *
     * @example
     * //returns client id name in data
     * const { success, data, message } = await api.createClient('client01', 'opsi.lan', 'Description', 'Client notes', '192.168.0.1', 'xx:xx:xx:xx:xx:01')
     * console.log(data) // returns client01.opsi.lan or an error object on fail
     * console.log(success) // if all data are ok then this should return true else false
     * console.log(message) // message is empty if success is true. if success is false there is a error message
     *
     * @param {string} clientName - Client Name
     * @param {string} domain - Client domain
     * @param {string} description - description of the client
     * @param {string} notes - Notes for this client
     * @param {string} ipAddress - Client IP Address
     * @param {string} hardwareAddress - physical address of the client
     * @returns {IfcResult} Object with result data
     */
    createClient(this: OPSIApi, clientName: string, domain?: string, description?: string, notes?: string, ipAddress?: string, hardwareAddress?: string): Promise<IfcResult>;
    /**
     * get client info
     *
     * @example
     * //returns object with client info
     * const { success, data, message } = await api.getClientInfo('client01.opsi.lan',)
     * console.log(data) // returns
     * { hostId: 'client01.opsi.lan',
     *   description: 'Description',
     *   created: '20190218185538',
     *   inventoryNumber: '',
     *   notes: 'Client notes',
     *   hardwareAddress: 'xx:xx:xx:xx:xx:01',
     *   lastSeen: '20190218185538',
     *   oneTimePassword: '',
     *   opsiHostKey: 'c7c082be4587a964af065724cbccc272',
     *   ipAddress: '192.168.0.1'}
     * console.log(success) // if all data are ok then this should return true else false
     * console.log(message) // message is empty if success is true. if success is false there is a error message
     *
     * @param {string} clientId - Client ID Name
     * @returns {IfcResult} Object with result data
     */
    getClientInfo(this: OPSIApi, clientId: any): Promise<IfcResult>;
    /**
     * // TODO: Add more data to this function
     *
     * @param clientId
     * @returns {IfcResult} Object with result data
     */
    getAllClientData(this: OPSIApi, clientId: any): Promise<IfcResult>;
    /**
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     * const { success, data, message } = await api.renameClient('client01.opsi.lan', 'client01-renamed.opsi.lan')
     * console.log(success) // if all data are ok then this should return true else false
     * console.log(message) // message is empty if success is true. if success is false there is a error message
     * console.log(data) // data returns also true or an error object on fail
     *
     * @param {string} name old id of the client
     * @param {string} newname new id
     * @returns {IfcResult} Object with result data
     */
    renameClient(this: OPSIApi, name: any, newname: any): Promise<IfcResult>;
    /**
     * delete one client by id.
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     * const { success, data, message } = await api.delete(clientId)
     * console.log(success) // if all data are ok then this should return true else false
     * console.log(message) // message is empty if success is true. if success is false there is a error message
     * console.log(data) // data returns null on success or an error object on fail
     *
     * @param {string} clientId - Client ID
     * @returns {IfcResult} Object with result data
     */
    deleteClient(this: OPSIApi, clientId: any): Promise<IfcResult>;
}
export { Client };

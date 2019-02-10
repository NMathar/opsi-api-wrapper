import * as request from "request-promise";
import {Client} from "./client";
import {Group} from "./group";
import {Result} from "./IfcResult";

/**
 * Class OPSIApi
 */
class OPSIApi implements Client, Group {

    apiURL: string;

    username: string;

    password: string;

    id: number;

    res: Result;

    /**
     * Create/Initiate OPSIApi.
     *
     * @param {string} apiURL - OPSI Api URL String Example: Https://opsiserver:4447.
     * @param {string} username - OPSI user with access rights.
     * @param {string} password - Password of the api user.
     * @param {int} id - OPSI Api Server ID. Default is 1
     */
    constructor(apiURL: string, username: string, password: string, id: number = 1) {
        if (!apiURL || !username || !password)
            throw new Error('Please define all constructor variables!')

        this.res = this.resetResult()
        this.apiURL = apiURL
        this.username = username
        this.password = password
        this.id = id
    }

    // ########### base api call functions

    /**
     * Get opsi version or false.
     *
     * @example
     * // returns a string of the opsi version or false
     * api.getOpsiVersion(function (obj) {
     * 		if(obj.success){
     *			console.log(obj.data.opsiVersion)
     *		}else if(!res.success){
     *		  	console.error(res.message)
     *		}
     * })
     * @returns {Result} Data.
     */
    getOpsiVersion(): Promise<Result> {
        this.resetResult();
        return this.sendRequest('backend_info', [], this.id)
    }

    /**
     * Get all server ids.
     *
     * @example
     * // returns array of server ids
     * api.serverIDs(function (res) {
     * 		if(res.success){
     *			console.log(res.data) // array if ids
     *		}else if(!res.success){
     *		  	console.error(res.message)
     *		}
     * })
     * @returns {Result} Data.
     */
    getServerIDs(): Promise<Result> {
        this.resetResult();
        return this.sendRequest('getServerIds_list', [], this.id)
    }

    /**
     * Is api user authenticated.
     *
     * @example
     * // returns boolean if user is logged in or not
     * api.isAuthenticated(function (res) {
     * 		if(res.success){
     *			console.log(res.data) // boolean
     *		}else if(!res.success){
     *		  	console.error(res.message)
     *		}
     * })
     * @returns {Result} Data.
     */
    isAuthenticated(): Promise<Result> {
        this.resetResult();
        return this.sendRequest('accessControl_authenticated', [], this.id)
    }

    /**
     * Is api user admin.
     *
     * @example
     * // returns if user has admin rights
     * api.isUserAdmin(function (res) {
     * 		if(res.success)
     *			console.log(res.data) // boolean
     *		}else if(!res.success){
     *		  	console.error(res.message)
     *		}
     * })
     * @returns {Result} Data.
     */
    isUserAdmin(): Promise<Result> {
        this.resetResult();
        return this.sendRequest('accessControl_userIsAdmin', [], this.id)
    }

    /**
     * Get server infos.
     *
     * @example
     * // returns array with objects of server data
     * api.getOpsiServerInfo(function (res) {
     * 		if(res.success){
     *			console.log(res.data[0]) // object of server data
     *		}else if(!res.success){
     *		  	console.error(res.message)
     *		}
     * })
     * @returns {Result} Data.
     */
    getOpsiServerInfo(): Promise<Result> {
        this.resetResult();
        return this.sendRequest('host_getObjects', [
            '',
            {
                'type': 'OpsiConfigserver'
            }
        ], this.id)
    }


    // ########### client actions

    getAllClients = Client.prototype.getAllClients

    createClient = Client.prototype.createClient

    getClientInfo = Client.prototype.getClientInfo

    renameClient = Client.prototype.renameClient

    deleteClient = Client.prototype.deleteClient

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

    getAllHostGroups = Group.prototype.getAllHostGroups

    createHostGroup = Group.prototype.createHostGroup

    getHostGroupInfo = Group.prototype.getHostGroupInfo

    groupNameExists = Group.prototype.groupNameExists

    addClientToGroup = Group.prototype.addClientToGroup

    getGroupClients = Group.prototype.getGroupClients

    removeClientFromGroup = Group.prototype.removeClientFromGroup

    renameGroup = Group.prototype.renameGroup

    deleteGroup = Group.prototype.deleteGroup


    // ########### Host actions

    /**
     * //TODO: host actions
     */


    // ########### Product actions


    /**
     * Get all products.
     *
     * @example
     * // returns an array of products
     * api.getAllProducts(function (res) {
     * 		if(res.success)
     *			console.log(res.data) // product array
     *		}else if(!res.success){
     *		  	console.error(res.message)
     *		}
     *    })
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Array} Data.
     */
    // getAllProducts(callback) {
    //     this.sendRequest('getProductIds_list', [], this.id, function (data) {
    //         // console.log(data)
    //         return callback(data)
    //     })
    // }

    /**
     * Get all actions for one product.
     *
     * @example
     * //returns array of actions for product
     * api.serverIDs(function (servers) {
     *		api.actionsForProduct('', servers[0], function (res) {
     * 			if(res.success){
     *				console.log(res.data) // array of product actions
     *			}else if(!res.success){
     *			  	console.error(res.message)
     *			}
     *		})
     *	})
     * @param {string} productid - Any id string.
     * @param {string }serverid - Serverid string that gets from serverIDs.
     * @returns {Result} Data.
     */
    // actionsForProduct(productid: string, serverid: number): Promise<Result> {
    //     return this.sendRequest('getPossibleProductActions_list', [productid, serverid], this.id)
    // }

    protected resetResult(){
        return this.res = {success: false, data: false, message: ''};
    }

    /**
     * Generate api call actions.
     *
     * @param {string} method - Api function name to call.
     * @param {Array} params - Array of method parameters.
     * @param {number} id - Id number.
     * @private
     */
    async sendRequest(method: string, params: any[], id: number): Promise<Result> {
        this.resetResult();
        const url = `${this.apiURL}/rpc`
        let options: any = {
            uri: url,
            rejectUnauthorized: false,
            auth: {
                'user': this.username,
                'pass': this.password,
                'sendImmediately': false
            },
            json: {
                'method': method,
                'params': params,
                'id': id
            }
        };

        await request.post(options)
            .then((body) => {
                if (!body.error) {
                    this.res = {success: true, data: body.result, message: ''}
                } else {
                    this.res = {success: false, data: body.error, message: body.error.message}
                }
            })
            .catch((err) => {
                this.res = {success: false, data: err, message: err.error.error.message ? err.error.error.message: 'Error'}
            });

        return this.res
    }
}

export {OPSIApi}

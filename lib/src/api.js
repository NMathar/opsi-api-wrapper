"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
const client_1 = require("./client");
/**
 * Class OPSIApi
 */
class OPSIApi {
    /**
     * Create/Initiate OPSIApi.
     *
     * @param {string} apiURL - OPSI Api URL String Example: Https://opsiserver:4447.
     * @param {string} username - OPSI user with access rights.
     * @param {string} password - Password of the api user.
     * @param {int} id - OPSI Api Server ID. Default is 1
     */
    constructor(apiURL, username, password, id = 1) {
        // ########### client actions
        this.getAllClients = client_1.Client.prototype.getAllClients;
        if (!apiURL || !username || !password)
            throw new Error('Please define all constructor variables!');
        this.apiURL = apiURL;
        this.username = username;
        this.password = password;
        this.id = id;
        // test api connection on construction  maybe obsolete if performance lacks
        // this.getOpsiVersion(function (data) {
        // 	if (!data)
        // 		throw new Error('API is not available!')
        // })
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
     * @returns {Object} Data.
     */
    getOpsiVersion() {
        return this.sendRequest('backend_info', [], this.id);
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
     * @param {Function} callback - Callback function.
     * @returns {Object} Data.
     */
    serverIDs() {
        return this.sendRequest('getServerIds_list', [], this.id);
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
     * @param {requestCallback} callback - The callback that handles the response. Function.
     * @returns {Object} Data.
     */
    isAuthenticated() {
        return this.sendRequest('accessControl_authenticated', [], this.id);
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
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Object} Data.
     */
    isUserAdmin() {
        return this.sendRequest('accessControl_userIsAdmin', [], this.id);
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
     * @param {Function} callback - Callback function.
     * @returns {Object} Data.
     */
    getOpsiServerInfo() {
        return this.sendRequest('host_getObjects', [
            '',
            {
                'type': 'OpsiConfigserver'
            }
        ], this.id);
    }
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
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Object} Data.
     */
    actionsForProduct(productid, serverid) {
        return this.sendRequest('getPossibleProductActions_list', [productid, serverid], this.id);
    }
    /**
     * create client.
     *
     * @example
     * //returns client id name
     * api.createClient(clientName, domain, description, notes, ipAddress, hardwareAddress, function (res) {
     * 		if(res.success){
     *			console.log(res.data) // clients array
     *		}else if(!res.success){
     *		  	console.error(res.message)
     *		}
     * })
     * @param {string} clientName - Client Name
     * @param {string} domain - Client domain
     * @param {string} description - description of the client
     * @param {string} notes - Notes for this client
     * @param {string} ipAddress - Client IP Address
     * @param {string} hardwareAddress - physical address of the client
     * @returns {Array|Object} Data Array or Object with error message (Object.message).
     */
    createClient(clientName, domain = '', description = '', notes = '', ipAddress = '', hardwareAddress = '') {
        if (!clientName || clientName === '')
            return { success: false, message: 'Please define a client name!' };
        return this.sendRequest('createClient', [
            clientName,
            domain,
            description,
            notes,
            ipAddress,
            hardwareAddress
        ], this.id);
    }
    /**
     * get client info
     *
     * @example
     * //returns object with client info
     * api.getHostGroupInfo(
     *                    'clientId',
     *                    function (res) {
     * 		if(res.success){
     *			console.log(res.data) // client data
     *		}else if(res){
     *		  	console.error(res.message) // error message
     *		}
     * })
     * @param {string} clientId - Client ID Name
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Object} Object of client data.
     */
    // getClientInfo(clientId) {
    //     if (!clientId || clientId === '')
    //         return {success: false, message: 'Please define a clientId!'}
    //
    //     return this.sendRequest('getHost_hash', [
    //         clientId
    //     ], this.id)
    // }
    /**
     * delete client.
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     *
     * api.delete(clientId, function (res) {
     * 		if(!res.success){
     *			console.error(res.message) // client error message
     *		}else if(res.success){
     *		  	console.log(res.data) // true
     *		}
     * })
     * @param {string} clientId - Client ID
     * @returns {Boolean|Object} Boolean or Object with error message (Object.message).
     */
    // deleteClient(clientId) {
    //     if (!clientId || clientId === '')
    //         return {success: false, message: 'Please define a clientId!'}
    //
    //     let data = this.sendRequest('deleteClient', [
    //         clientId
    //     ], this.id)
    //     return data
    //     // return data.message ? data : {success: true, data: true}
    // }
    /**
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     *
     * api.renameClient(name, newname, function (res) {
     * 		if(!res.success){
     *			console.error(res.message) // client error message
     *		}else if(res.success){
     *		  	console.log(res.data) // true
     *		}
     * })
     *
     * @param {string} name old id of the client
     * @param {string} newname id
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Boolean|Object} Boolean or Object with error message (Object.message).
     */
    // renameClient(name, newname, callback) {
    //     this.sendRequest('host_renameOpsiClient', [
    //         name,
    //         newname
    //     ], this.id, function (data) {
    //         // console.log(data.message)
    //         return callback(data.message ? data : {success: true, data: true})
    //     })
    // }
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
    /**
     * Get all groups.
     *
     * @exmaple
     * //returns an array of opsi groups
     * api.getAllGroups(function (res) {
     * 		if(res.success)
     *			console.log(res.data) // groups array
     *		}else if(!res.success){
     *		  	console.error(res.message)
     *		}
     *    })
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Array} Data.
     */
    // getAllHostGroups(callback) {
    //     this.sendRequest('group_getObjects', [], this.id, function (data) {
    //         // console.log(data)
    //         return callback(data)
    //     })
    // }
    /**
     * create group
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     * api.createHostGroup(
     *                    'groupName',
     *                    'members',
     *                    'description',
     *                    'parentGroupId', function (res) {
     * 		if(!res.success){
     *			console.error(res.message) // client error message
     *		}else if(res.success){
     *		  	console.log(res.data) // true
     *		}
     * })
     * @param {string} groupName - Group ID Name
     * @param {string} members - Members Object? String? Array?
     * @param {string} description - Group description string
     * @param {string} parentGroupId - Parent Group ID Name
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Boolean|Object} Boolean or Object with error message (Object.message).
     */
    // createHostGroup(groupName, members = '', description = '', parentGroupId = '', callback) {
    //     if (!groupName || groupName === '')
    //         return callback({success: false, message: 'Please define a group name!'})
    //
    //     this.sendRequest('createGroup', [
    //         groupName,
    //         members,
    //         description,
    //         parentGroupId,
    //     ], this.id, function (data) {
    //         // console.log(data)
    //         return callback(data.message ? data : {success: true, data: true})
    //     })
    // }
    /**
     * get group info
     *
     * @example
     * //returns object with group info
     * api.getHostGroupInfo(
     *                    'groupName',
     *                    function (res) {
     * 		if(res.success){
     *			console.log(res.data) // client data
     *		}else if(res){
     *		  	console.error(res.message) // error message
     *		}
     * })
     * @param {string} groupName - Group ID Name
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Object} Object of group data.
     */
    // getHostGroupInfo(groupName = '', callback) {
    //     if (!groupName || groupName === '')
    //         return callback({success: false, message: 'Please define a groupName!'})
    //
    //     this.sendRequest('group_getObjects', [
    //         '',
    //         {
    //             'id': groupName,
    //             'type': 'HostGroup'
    //         }
    //     ], this.id, function (data) {
    //         // console.log(data)
    //         if (data.success)
    //             data.data = data.data[0]
    //
    //         return callback(data)
    //     })
    // }
    /**
     * group name exists
     *
     * @example
     * //returns boolean
     * api.groupNameExists(
     *                    'groupName',
     *                    function (res) {
     * 		if(res.success){
     *			console.log(res.data) // boolean
     *		}else if(res){
     *		  	console.error(res.message) // error message
     *		}
     * })
     * @param {string} groupName - Group ID Name
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Object} Object
     */
    // groupNameExists(groupName, callback) {
    //     if (!groupName || groupName === '')
    //         return callback({success: false, message: 'Please define a groupName!'})
    //
    //     this.sendRequest('groupname_exists', [
    //         groupName
    //     ], this.id, function (data) {
    //         // console.log(data)
    //         return callback(data)
    //     })
    // }
    /**
     * delete group
     * if group id string is an empty string all groups would be deleted WARNING!!!
     *
     *  @example
     * //returns boolean only on super bad data it will return an error message
     *
     * api.delete(groupId, function (res) {
     * 		if(!res.success){
     *			console.error(res.message) // client error message
     *		}else if(res.success){
     *		  	console.log(res.data) // true
     *		}
     * })
     * @param {string} groupId - Group ID
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Boolean|Object} Boolean or Object with error message (Object.message).
     */
    // deleteGroup(groupId, callback) {
    //     if (!groupId || groupId === '')
    //         return callback({success: false, message: 'Please define a group Id!'})
    //
    //     this.sendRequest('group_delete', [
    //         groupId
    //     ], this.id, function (data) {
    //         // console.log(data.message)
    //         return callback(data.message ? data : {success: true, data: true})
    //     })
    // }
    /**
     * add client to group
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     *
     * api.addClientToGroup(clientId, groupId, function (res) {
     * 		if(!res.success){
     *			console.error(res.message) // client error message
     *		}else if(res.success){
     *		  	console.log(res.data) // true
     *		}
     * })
     * @param {string} clientId - Client ID
     * @param {string} groupId - Group ID
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Boolean|Object} Boolean or Object with error message (Object.message).
     */
    // addClientToGroup(clientId, groupId, callback) {
    //     if (!groupId || groupId === '' || !clientId || clientId === '')
    //         return callback({success: false, message: 'Please define a group id and a client id!'})
    //
    //     let self = this
    //     self.groupNameExists(groupId, function (group) {
    //         if (group.data) {
    //             self.getClientInfo(clientId, function (client) {
    //                 if (client.success) {
    //                     self.sendRequest('objectToGroup_create', [
    //                         'HostGroup',
    //                         groupId,
    //                         clientId
    //                     ], self.id, function (data) {
    //                         // console.log(data)
    //                         return callback(data.message ? data : {success: true, data: true})
    //                     })
    //                 } else {
    //                     return callback({success: false, message: 'Client not exists!'})
    //                 }
    //             })
    //
    //         } else {
    //             return callback({success: false, message: 'Group not exists!'})
    //         }
    //     })
    // }
    /**
     * get clients from group
     *
     * @example
     * //return array of clients
     *
     * api.getGroupClients(groupId, function (res) {
     * 		if(!res.success){
     *			console.error(res.message) // client error message
     *		}else if(res.success){
     *		  	console.log(res.data) // Array of clients
     *		}
     * })
     * @param {string} groupId - Group ID
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Array} Array with clients or empty array.
     */
    // getGroupClients(groupId, callback) {
    //     if (!groupId || groupId === '')
    //         return callback({success: false, message: 'Please define a groupId!'})
    //
    //     this.sendRequest('objectToGroup_getObjects', [
    //         '',
    //         {
    //             'groupType': 'HostGroup',
    //             'groupId': groupId
    //         }
    //     ], this.id, function (data) {
    //         // console.log(data.message)
    //         return callback(data)
    //     })
    // }
    /**
     * remove client from group
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     *
     * api.removeClientFromGroup(clientId, groupId, function (res) {
     * 		if(!res.success){
     *			console.error(res.message) // client error message
     *		}else if(res.success){
     *		  	console.log(res.data) // true
     *		}
     * })
     * @param {string} clientId - Client ID
     * @param {string} groupId - Group ID
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Boolean|Object} Boolean or Object with error message (Object.message).
     */
    // removeClientFromGroup(clientId, groupId, callback) {
    //     if (!groupId || groupId === '' || !clientId || clientId === '')
    //         return callback({success: false, message: 'Please define a group id and a client id!'})
    //
    //     this.sendRequest('objectToGroup_delete', [
    //         'HostGroup',
    //         groupId,
    //         clientId
    //     ], this.id, function (data) {
    //         // console.log(data.message)
    //         callback(data.message ? data : {success: true, data: true})
    //     })
    // }
    /**
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     *
     * api.renameGroup(name, newname, function (res) {
     * 		if(!res.success){
     *			console.error(res.message) // group error message
     *		}else if(res.success){
     *		  	console.log(res.data) // true
     *		}
     * })
     *
     * @param {string} name old id of the group
     * @param {string} newname id
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Boolean|Object} Boolean or Object with error message (Object.message).
     */
    // renameGroup(name, newname, callback) {
    //     this.sendRequest('group_rename', [
    //         name,
    //         newname
    //     ], this.id, function (data) {
    //         // console.log(data)
    //         return callback(data.message ? data : {success: true, data: true})
    //     })
    // }
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
     * Generate api call actions.
     *
     * @param {string} method - Api function name to call.
     * @param {Array} params - Array of method parameters.
     * @param {number} id - Id number.
     * @private
     */
    sendRequest(method, params, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.apiURL}/rpc`;
            let options = {
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
            let res = { success: false, data: null, message: 'empty' };
            yield request.post(options)
                .then((body) => {
                res = { success: true, data: body, message: '' };
            })
                .catch((err) => {
                res = { success: false, data: null, message: err };
            });
            // console.log(res)
            return res;
        });
    }
}
exports.OPSIApi = OPSIApi;

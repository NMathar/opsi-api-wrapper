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
const group_1 = require("./group");
const product_1 = require("./product");
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
        this.createClient = client_1.Client.prototype.createClient;
        this.getClientInfo = client_1.Client.prototype.getClientInfo;
        this.getAllClientData = client_1.Client.prototype.getAllClientData;
        this.renameClient = client_1.Client.prototype.renameClient;
        this.deleteClient = client_1.Client.prototype.deleteClient;
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
        this.getAllHostGroups = group_1.Group.prototype.getAllHostGroups;
        this.createHostGroup = group_1.Group.prototype.createHostGroup;
        this.getHostGroupInfo = group_1.Group.prototype.getHostGroupInfo;
        this.groupNameExists = group_1.Group.prototype.groupNameExists;
        this.addClientToGroup = group_1.Group.prototype.addClientToGroup;
        this.getGroupClients = group_1.Group.prototype.getGroupClients;
        this.removeClientFromGroup = group_1.Group.prototype.removeClientFromGroup;
        this.renameGroup = group_1.Group.prototype.renameGroup;
        this.deleteGroup = group_1.Group.prototype.deleteGroup;
        // ########### Product actions
        this.getAllProducts = product_1.Product.prototype.getAllProducts;
        this.getAllActionsForProduct = product_1.Product.prototype.getAllActionsForProduct;
        this.getProductInfo = product_1.Product.prototype.getProductInfo;
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
    getOpsiVersion() {
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
    getServerIDs() {
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
    isAuthenticated() {
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
    isUserAdmin() {
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
    getOpsiServerInfo() {
        this.resetResult();
        return this.sendRequest('host_getObjects', [
            '',
            {
                type: 'OpsiConfigserver',
            },
        ], this.id);
    }
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
            this.resetResult();
            const url = `${this.apiURL}/rpc`;
            const options = {
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
            yield request
                .post(options)
                .then(body => {
                if (!body.error) {
                    this.res = { success: true, data: body.result, message: '' };
                }
                else {
                    this.res = { success: false, data: body.error, message: body.error.message };
                }
            })
                .catch(err => {
                this.res = { success: false, data: err, message: err.error.error.message ? err.error.error.message : 'Error' };
            });
            return this.res;
        });
    }
    // ########### Host actions
    /**
     * //TODO: host actions
     */
    resetResult() {
        return (this.res = { success: false, data: false, message: '' });
    }
}
exports.OPSIApi = OPSIApi;
//# sourceMappingURL=api.js.map
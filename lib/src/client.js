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
class Client {
    /**
     * Get all clients.
     *
     * @example
     * //returns array of all clients
     * api.getAllClients(function (res) {
     * 		if(res.success){
     *			console.log(res.data) // client array
     *		}else if(!res.success){
     *		  	console.error(res.message)
     *		}
     * })
     * @returns {Array} Data.
     */
    getAllClients() {
        return this.sendRequest('getClientIds_list', [], this.id);
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
        return __awaiter(this, void 0, void 0, function* () {
            if (!clientName || clientName === '')
                return { success: false, message: 'Please define a client name!' };
            // let res: Result = {success: false, data: {}, message: 'empty'};
            const resTest = yield this.sendRequest('createClient', [
                clientName,
                domain,
                description,
                notes,
                ipAddress,
                hardwareAddress
            ], this.id);
            return resTest.data;
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map
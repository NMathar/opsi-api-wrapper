"use strict";
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
}
exports.Client = Client;

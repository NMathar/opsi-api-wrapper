import {OPSIApi} from "./api";

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
    getAllClients(this: OPSIApi) {
        return this.sendRequest('getClientIds_list', [], this.id)
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
    async createClient(this: OPSIApi, clientName: string, domain: string = '', description: string = '', notes: string = '', ipAddress: string = '', hardwareAddress: string = '') {
        if (!clientName || clientName === '')
            return {success: false, data:{}, message: 'Please define a client name!'}

        // let res: Result = {success: false, data: {}, message: 'empty'};

        return await this.sendRequest('createClient', [
            clientName,
            domain,
            description,
            notes,
            ipAddress,
            hardwareAddress
        ], this.id);
    }
}

export {Client}

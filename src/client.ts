import { OPSIApi } from "./api";

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
}
export { Client }

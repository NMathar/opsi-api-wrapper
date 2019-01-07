const request = require('request')

/**
 * Class OPISApi
 */
class OPSIApi {
	/**
	 * This callback type is called `requestCallback` and is displayed as a global symbol.
	 *
	 * @callback requestCallback
	 * @param {any} data
	 */


	/**
	 * Create OPSIApi.
	 *
	 * @param {string} apiURL - OPSI Api URL String Example: Https://opsiserver:4447.
	 * @param {string} username - OPSI user with acces rights.
	 * @param {string} password - Password of the api user.
	 */
	constructor(apiURL, username, password, id = 1) {
		if (!apiURL || !username || !password)
			throw new Error('Please define all constructor variables!')

		this.apiURL = apiURL
		this.username = username
		this.password = password
		this.id = id
	}

	//base api call functions


	/**
	 * Get all server ids.
	 *
	 * @example
	 * // returns array of server ids
	 * api.serverIDs(function (serveridArray) {
	 *		console.log(serveridArray)
	 * })
	 * @param {Function} callback - Callback function.
	 * @returns {Array} Data.
	 */
	serverIDs(callback) {
		this._sendRequest('getServerIds_list', [], this.id, function (data) {
			// console.log(data)
			return callback(data)
		})
	}

	/**
	 * Is api user authenticated.
	 *
	 * @example
	 * // returns boolean if user is logged in or not
	 * api.isAuthenticated(function (boolean) {
	 *		console.log(boolean)
	 * })
	 * @param {requestCallback} callback - The callback that handles the response. Function.
	 * @returns {boolean} Data.
	 */
	isAuthenticated(callback) {
		this._sendRequest('accessControl_authenticated', [], this.id, function (data) {
			// console.log(data)
			return callback(data)
		})
	}

	/**
	 * Is api user admin.
	 *
	 * @example
	 * // returns if user has admin rights
	 * api.isUserAdmin(function (boolean) {
	 *		console.log(boolean)
	 * })
	 * @param {requestCallback} callback - The callback that handles the response.
	 * @returns {boolean} Data.
	 */
	isUserAdmin(callback) {
		this._sendRequest('accessControl_userIsAdmin', [], this.id, function (data) {
			// console.log(data)
			return callback(data)
		})
	}

	/**
	 * Get all actions for one product.
	 *
	 * @example
	 * //returns array of actions for product
	 * api.serverIDs(function (servers) {
	 *		api.actionsForProduct('', servers[0], function (productActionArray) {
	 *			console.log(productActionArray)
	 *		})
	 *	})
	 * @param {string} productid - Any id string.
	 * @param {string }serverid - Serverid string that gets from serverIDs.
	 * @param {requestCallback} callback - The callback that handles the response.
	 * @returns {Array} Data.
	 */
	actionsForProduct(productid, serverid, callback) {
		this._sendRequest('getPossibleProductActions_list', [productid, serverid], this.id, function (data) {
			// console.log(data)
			return callback(data)
		})
	}


	/**
	 * Get all clients.
	 *
	 * @example
	 * //returns array of all clients
	 * api.getAllClients(function (clientsArray) {
	 *		console.log(clientsArray)
	 * })
	 * @param {requestCallback} callback - The callback that handles the response.
	 * @returns {Array} Data.
	 */
	getAllClients(callback) {
		this._sendRequest('getClientIds_list', [], this.id, function (data) {
			// console.log(data)
			return callback(data)
		})
	}

	/**
	 * Get all products.
	 *
	 * @example
	 * // returns an array of products
	 * api.getAllProducts(function (productsArray) {
	 *		console.log(productsArray)
	 *	})
	 * @param {requestCallback} callback - The callback that handles the response.
	 * @returns {Array} Data.
	 */
	getAllProducts(callback) {
		this._sendRequest('getProductIds_list', [], this.id, function (data) {
			// console.log(data)
			return callback(data)
		})
	}

	/**
	 * Get all groups.
	 *
	 * @exmaple
	 * //returns an array of opsi groups
	 * api.getAllGroups(function (groupsArray) {
	 *		console.log(groupsArray)
	 *	})
	 * @param {requestCallback} callback - The callback that handles the response.
	 * @returns {Array} Data.
	 */
	getAllGroups(callback) {
		this._sendRequest('objectToGroup_getObjects', [], this.id, function (data) {
			// console.log(data)
			return callback(data)
		})
	}


	/**
	 * Generate api call actions.
	 *
	 * @param {string} method - Api function name to call.
	 * @param {Array} params - Array of method parameters.
	 * @param {number} id - Id number.
	 * @param {requestCallback} callback - The callback that handles the response.
	 * @private
	 */
	_sendRequest(method, params, id, callback) {
		const url = `${this.apiURL}/rpc`

		request({
			method: 'post',
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
		},
		function (error, response, body) {
			if (!error && response.statusCode === 200) {
				if (body.error) {
					// console.error(body.error)
					callback(body.error)
				} else {
					callback(body.result)
				}
			} else {
				new Error(error)
			}
		})
	}
}

module.exports = OPSIApi

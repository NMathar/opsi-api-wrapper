const request = require('request')

class OPSIApi {
	constructor(apiURL, username, password) {
		if (!apiURL || !username || !password)
			throw new Error('Please define all constructor variables!')

		this.apiURL = apiURL
		this.username = username
		this.password = password
	}

	//base api call functions


	/**
	 * get all server ids
	 *
	 * @param callback
	 * @return array
	 */
	serverIDs(callback) {
		this._sendRequest('getServerIds_list', [], 1, function (data) {
			// console.log(data)
			return callback(data)
		})
	}

	/**
	 * is api user authenticated
	 *
	 * @param callback
	 * @return boolean
	 */
	isAuthenticated(callback) {
		this._sendRequest('accessControl_authenticated', [], 1, function (data) {
			// console.log(data)
			return callback(data)
		})
	}

	/**
	 * is api user admin
	 *
	 * @param callback
	 * @return boolean
	 */
	isUserAdmin(callback) {
		this._sendRequest('accessControl_userIsAdmin', [], 1, function (data) {
			// console.log(data)
			return callback(data)
		})
	}

	/**
	 * get all actions for one product
	 *
	 * @param productid
	 * @param serverid
	 * @param callback
	 * @return array
	 */
	actionsForProduct(productid, serverid, callback) {
		this._sendRequest('getPossibleProductActions_list', [productid, serverid], 1, function (data) {
			// console.log(data)
			return callback(data)
		})
	}


	/**
	 * get all clients
	 *
	 * @param callback
	 * @return array
	 */
	getAllClients(callback){
		this._sendRequest('getClientIds_list', [], 1, function (data) {
			// console.log(data)
			return callback(data)
		})
	}

	/**
	 * get all products
	 *
	 * @param callback
	 * @return array
	 */
	getAllProducts(callback){
		this._sendRequest('getProductIds_list', [], 1, function (data) {
			// console.log(data)
			return callback(data)
		})
	}

	/**
	 * get all groups
	 *
	 * @param callback
	 * @return array
	 */
	getAllGroups(callback){
		this._sendRequest('objectToGroup_getObjects', [], 1, function (data) {
			// console.log(data)
			return callback(data)
		})
	}


	/**
	 * generate api call actions
	 *
	 * @param method
	 * @param params
	 * @param id
	 * @param callback
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
						console.error(body.error)
						callback(body.error)
					} else {
						callback(body.result)
					}
				} else {
					console.error(error)
				}
			})
	}
}

module.exports = OPSIApi

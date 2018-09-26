const request = require('request')

class OPSIApi {
	constructor(apiURL, username, password) {
		if (!apiURL || !username || !password)
			throw new Error('Please define all constructor variables!')

		this.apiURL = apiURL
		this.username = username
		this.password = password
	}

	serverIDs(callback) {
		this._sendRequest('getServerIds_list', [], 1, function (data) {
			console.log(data)
			return callback(data)
		})
	}

	actionsForProduct(productid, serverid, callback){
		this._sendRequest('getPossibleProductActions_list', [productid, serverid], 1, function (data) {
			console.log(data)
			return callback(data)
		})
	}

	//api call functions

	// mostEmailed(callback) {
	//     this._sendRequest("mostemailed", callback)
	// }
	//
	// mostViewed(callback) {
	//     this._sendRequest("mostviewed", callback)
	// }
	//
	// mostShared(callback) {
	//     this._sendRequest("mostshared", callback)
	// }

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

		// ).on('error', function (err) {
		// 	console.error(err)
		// }).on('response', function (response) {
		// 	// unmodified http.IncomingMessage object
		// 	console.log(response)
		// 	// response.on('data', function (data) {
		// 	// 	console.log(data)
		// 	// 	if (!error & response.statusCode === 200) {
		// 	// 		callback(JSON.parse(body).results)
		// 	// 	}
		// 	// })
		// })


		// request(url, function (error, response, body) {
		// 	if (!error & response.statusCode === 200) {
		// 		callback(JSON.parse(body).results)
		// 	}
		// })
	}
}

module.exports = OPSIApi

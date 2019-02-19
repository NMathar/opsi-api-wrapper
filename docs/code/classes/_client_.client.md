[opsi-api](../README.md) > ["client"](../modules/_client_.md) > [Client](../classes/_client_.client.md)

# Class: Client

## Hierarchy

**Client**

## Implemented by

* [OPSIApi](_api_.opsiapi.md)

## Index

### Methods

* [createClient](_client_.client.md#createclient)
* [deleteClient](_client_.client.md#deleteclient)
* [getAllClientData](_client_.client.md#getallclientdata)
* [getAllClients](_client_.client.md#getallclients)
* [getClientInfo](_client_.client.md#getclientinfo)
* [renameClient](_client_.client.md#renameclient)
* [updateClient](_client_.client.md#updateclient)

---

## Methods

<a id="createclient"></a>

###  createClient

▸ **createClient**(this: *[OPSIApi](_api_.opsiapi.md)*, clientName: *`string`*, domain?: *`string`*, description?: *`string`*, notes?: *`string`*, ipAddress?: *`string`*, hardwareAddress?: *`string`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [client.ts:54](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/client.ts#L54)*

create client.

*__example__*: //returns client id name in data const { success, data, message } = await api.createClient('client01', 'opsi.lan', 'Description', 'Client notes', '192.168.0.1', 'xx:xx:xx:xx:xx:01') console.log(data) // returns client01.opsi.lan or an error object on fail console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) | - |
| clientName | `string` | - |  Client Name |
| `Default value` domain | `string` | &quot;&quot; |  Client domain |
| `Default value` description | `string` | &quot;&quot; |  description of the client |
| `Default value` notes | `string` | &quot;&quot; |  Notes for this client |
| `Default value` ipAddress | `string` | &quot;&quot; |  Client IP Address |
| `Default value` hardwareAddress | `string` | &quot;&quot; |  physical address of the client |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="deleteclient"></a>

###  deleteClient

▸ **deleteClient**(this: *[OPSIApi](_api_.opsiapi.md)*, clientId: *`string`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [client.ts:209](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/client.ts#L209)*

delete one client by id.

*__example__*: //returns boolean only on super bad data it will return an error message const { success, data, message } = await api.delete(clientId) console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message console.log(data) // data returns null on success or an error object on fail

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |
| clientId | `string` |  Client ID |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="getallclientdata"></a>

###  getAllClientData

▸ **getAllClientData**(this: *[OPSIApi](_api_.opsiapi.md)*, clientId: *`string`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [client.ts:157](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/client.ts#L157)*

// TODO: Add more data to this function

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |
| clientId | `string` |  \- |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="getallclients"></a>

###  getAllClients

▸ **getAllClients**(this: *[OPSIApi](_api_.opsiapi.md)*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [client.ts:29](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/client.ts#L29)*

Get all clients.

*__example__*: //returns array of all clients const { success, data, message } = await api.getAllClients() console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message console.log(data) // returns array of client objects or an error object on fail \[ { ident: 'client01.opsi.lan', description: 'Description', created: '2019-02-18 18:50:33', inventoryNumber: '', ipAddress: null, notes: '', oneTimePassword: null, lastSeen: '2019-02-18 18:50:33', hardwareAddress: null, opsiHostKey: '8b3ffde7170a25d48104141786ad9ba2', type: 'OpsiClient', id: 'client01.opsi.lan' } \]

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="getclientinfo"></a>

###  getClientInfo

▸ **getClientInfo**(this: *[OPSIApi](_api_.opsiapi.md)*, clientId: *`string`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [client.ts:133](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/client.ts#L133)*

get client info

*__example__*: //returns object with client info const { success, data, message } = await api.getClientInfo('client01.opsi.lan',) console.log(data) // returns { ident: 'client01.opsi.lan', description: 'Description', created: '2019-02-19 18:11:10', inventoryNumber: '', ipAddress: null, notes: '', oneTimePassword: null, lastSeen: '2019-02-19 18:11:10', hardwareAddress: null, opsiHostKey: 'c748d0b0d2015dfda0306dc0a862a612', type: 'OpsiClient', id: 'client01.opsi.lan' } console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |
| clientId | `string` |  Client ID Name |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="renameclient"></a>

###  renameClient

▸ **renameClient**(this: *[OPSIApi](_api_.opsiapi.md)*, name: *`string`*, newname: *`string`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [client.ts:185](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/client.ts#L185)*

*__example__*: //returns boolean only on super bad data it will return an error message const { success, data, message } = await api.renameClient('client01.opsi.lan', 'client01-renamed.opsi.lan') console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message console.log(data) // data returns also true or an error object on fail

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |
| name | `string` |  old id of the client |
| newname | `string` |  new id |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="updateclient"></a>

###  updateClient

▸ **updateClient**(this: *[OPSIApi](_api_.opsiapi.md)*, clientObject: *`object`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [client.ts:93](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/client.ts#L93)*

update client

*__example__*: //returns boolean only on super bad data it will return an error message const { success, data, message } = await api.updateClient( {ident: 'client01.opsi.lan', note: 'add update note'} ) console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message console.log(data) // data returns also true or an error object on fail

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |
| clientObject | `object` |  group object with ident key |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___


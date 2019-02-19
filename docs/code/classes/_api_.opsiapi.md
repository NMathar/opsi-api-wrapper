[opsi-api](../README.md) > ["api"](../modules/_api_.md) > [OPSIApi](../classes/_api_.opsiapi.md)

# Class: OPSIApi

Class OPSIApi

## Hierarchy

**OPSIApi**

## Implements

* [Client](_client_.client.md)
* [Group](_group_.group.md)
* [Product](_product_.product.md)

## Index

### Constructors

* [constructor](_api_.opsiapi.md#constructor)

### Properties

* [addClientToGroup](_api_.opsiapi.md#addclienttogroup)
* [apiURL](_api_.opsiapi.md#apiurl)
* [createClient](_api_.opsiapi.md#createclient)
* [createHostGroup](_api_.opsiapi.md#createhostgroup)
* [deleteClient](_api_.opsiapi.md#deleteclient)
* [deleteGroup](_api_.opsiapi.md#deletegroup)
* [getAllActionsForProduct](_api_.opsiapi.md#getallactionsforproduct)
* [getAllClientData](_api_.opsiapi.md#getallclientdata)
* [getAllClients](_api_.opsiapi.md#getallclients)
* [getAllHostGroups](_api_.opsiapi.md#getallhostgroups)
* [getAllProducts](_api_.opsiapi.md#getallproducts)
* [getClientInfo](_api_.opsiapi.md#getclientinfo)
* [getGroupClients](_api_.opsiapi.md#getgroupclients)
* [getHostGroupInfo](_api_.opsiapi.md#gethostgroupinfo)
* [getProductInfo](_api_.opsiapi.md#getproductinfo)
* [groupNameExists](_api_.opsiapi.md#groupnameexists)
* [id](_api_.opsiapi.md#id)
* [password](_api_.opsiapi.md#password)
* [removeClientFromGroup](_api_.opsiapi.md#removeclientfromgroup)
* [renameClient](_api_.opsiapi.md#renameclient)
* [renameGroup](_api_.opsiapi.md#renamegroup)
* [res](_api_.opsiapi.md#res)
* [updateClient](_api_.opsiapi.md#updateclient)
* [updateHostGroup](_api_.opsiapi.md#updatehostgroup)
* [username](_api_.opsiapi.md#username)

### Methods

* [getOpsiServerInfo](_api_.opsiapi.md#getopsiserverinfo)
* [getOpsiVersion](_api_.opsiapi.md#getopsiversion)
* [getServerIDs](_api_.opsiapi.md#getserverids)
* [isAuthenticated](_api_.opsiapi.md#isauthenticated)
* [isUserAdmin](_api_.opsiapi.md#isuseradmin)
* [resetResult](_api_.opsiapi.md#resetresult)
* [returnOneResult](_api_.opsiapi.md#returnoneresult)
* [sendRequest](_api_.opsiapi.md#sendrequest)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new OPSIApi**(apiURL: *`string`*, username: *`string`*, password: *`string`*, id?: *`number`*): [OPSIApi](_api_.opsiapi.md)

*Defined in [api.ts:80](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L80)*

Create/Initiate OPSIApi.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| apiURL | `string` | - |  OPSI Api URL String Example: Https://opsiserver:4447. |
| username | `string` | - |  OPSI user with access rights. |
| password | `string` | - |  Password of the api user. |
| `Default value` id | `number` | 1 |  OPSI Api Server ID. Default is 1 |

**Returns:** [OPSIApi](_api_.opsiapi.md)

___

## Properties

<a id="addclienttogroup"></a>

###  addClientToGroup

**● addClientToGroup**: *[addClientToGroup](_group_.group.md#addclienttogroup)* =  Group.prototype.addClientToGroup

*Defined in [api.ts:63](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L63)*

___
<a id="apiurl"></a>

###  apiURL

**● apiURL**: *`string`*

*Defined in [api.ts:11](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L11)*

___
<a id="createclient"></a>

###  createClient

**● createClient**: *[createClient](_client_.client.md#createclient)* =  Client.prototype.createClient

*Defined in [api.ts:25](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L25)*

___
<a id="createhostgroup"></a>

###  createHostGroup

**● createHostGroup**: *[createHostGroup](_group_.group.md#createhostgroup)* =  Group.prototype.createHostGroup

*Defined in [api.ts:55](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L55)*

___
<a id="deleteclient"></a>

###  deleteClient

**● deleteClient**: *[deleteClient](_client_.client.md#deleteclient)* =  Client.prototype.deleteClient

*Defined in [api.ts:35](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L35)*

___
<a id="deletegroup"></a>

###  deleteGroup

**● deleteGroup**: *[deleteGroup](_group_.group.md#deletegroup)* =  Group.prototype.deleteGroup

*Defined in [api.ts:71](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L71)*

___
<a id="getallactionsforproduct"></a>

###  getAllActionsForProduct

**● getAllActionsForProduct**: *[getAllActionsForProduct](_product_.product.md#getallactionsforproduct)* =  Product.prototype.getAllActionsForProduct

*Defined in [api.ts:78](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L78)*

___
<a id="getallclientdata"></a>

###  getAllClientData

**● getAllClientData**: *[getAllClientData](_client_.client.md#getallclientdata)* =  Client.prototype.getAllClientData

*Defined in [api.ts:31](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L31)*

___
<a id="getallclients"></a>

###  getAllClients

**● getAllClients**: *[getAllClients](_client_.client.md#getallclients)* =  Client.prototype.getAllClients

*Defined in [api.ts:23](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L23)*

___
<a id="getallhostgroups"></a>

###  getAllHostGroups

**● getAllHostGroups**: *[getAllHostGroups](_group_.group.md#getallhostgroups)* =  Group.prototype.getAllHostGroups

*Defined in [api.ts:53](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L53)*

___
<a id="getallproducts"></a>

###  getAllProducts

**● getAllProducts**: *[getAllProducts](_product_.product.md#getallproducts)* =  Product.prototype.getAllProducts

*Defined in [api.ts:76](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L76)*

___
<a id="getclientinfo"></a>

###  getClientInfo

**● getClientInfo**: *[getClientInfo](_client_.client.md#getclientinfo)* =  Client.prototype.getClientInfo

*Defined in [api.ts:29](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L29)*

___
<a id="getgroupclients"></a>

###  getGroupClients

**● getGroupClients**: *[getGroupClients](_group_.group.md#getgroupclients)* =  Group.prototype.getGroupClients

*Defined in [api.ts:65](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L65)*

___
<a id="gethostgroupinfo"></a>

###  getHostGroupInfo

**● getHostGroupInfo**: *[getHostGroupInfo](_group_.group.md#gethostgroupinfo)* =  Group.prototype.getHostGroupInfo

*Defined in [api.ts:59](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L59)*

___
<a id="getproductinfo"></a>

###  getProductInfo

**● getProductInfo**: *[getProductInfo](_product_.product.md#getproductinfo)* =  Product.prototype.getProductInfo

*Defined in [api.ts:80](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L80)*

___
<a id="groupnameexists"></a>

###  groupNameExists

**● groupNameExists**: *[groupNameExists](_group_.group.md#groupnameexists)* =  Group.prototype.groupNameExists

*Defined in [api.ts:61](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L61)*

___
<a id="id"></a>

###  id

**● id**: *`number`*

*Defined in [api.ts:17](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L17)*

___
<a id="password"></a>

###  password

**● password**: *`string`*

*Defined in [api.ts:15](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L15)*

___
<a id="removeclientfromgroup"></a>

###  removeClientFromGroup

**● removeClientFromGroup**: *[removeClientFromGroup](_group_.group.md#removeclientfromgroup)* =  Group.prototype.removeClientFromGroup

*Defined in [api.ts:67](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L67)*

___
<a id="renameclient"></a>

###  renameClient

**● renameClient**: *[renameClient](_client_.client.md#renameclient)* =  Client.prototype.renameClient

*Defined in [api.ts:33](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L33)*

___
<a id="renamegroup"></a>

###  renameGroup

**● renameGroup**: *[renameGroup](_group_.group.md#renamegroup)* =  Group.prototype.renameGroup

*Defined in [api.ts:69](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L69)*

___
<a id="res"></a>

###  res

**● res**: *[IfcResult](../interfaces/_ifcresult_.ifcresult.md)*

*Defined in [api.ts:19](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L19)*

___
<a id="updateclient"></a>

###  updateClient

**● updateClient**: *[updateClient](_client_.client.md#updateclient)* =  Client.prototype.updateClient

*Defined in [api.ts:27](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L27)*

___
<a id="updatehostgroup"></a>

###  updateHostGroup

**● updateHostGroup**: *[updateHostGroup](_group_.group.md#updatehostgroup)* =  Group.prototype.updateHostGroup

*Defined in [api.ts:57](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L57)*

___
<a id="username"></a>

###  username

**● username**: *`string`*

*Defined in [api.ts:13](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L13)*

___

## Methods

<a id="getopsiserverinfo"></a>

###  getOpsiServerInfo

▸ **getOpsiServerInfo**(): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [api.ts:169](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L169)*

Get server infos.

*__example__*: // returns array with objects of server data api.getOpsiServerInfo()

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Data.

___
<a id="getopsiversion"></a>

###  getOpsiVersion

▸ **getOpsiVersion**(): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [api.ts:113](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L113)*

Get opsi version or false.

*__example__*: // returns a string of the opsi version or false api.getOpsiVersion()

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Data.

___
<a id="getserverids"></a>

###  getServerIDs

▸ **getServerIDs**(): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [api.ts:127](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L127)*

Get all server ids.

*__example__*: // returns array of server ids api.serverIDs()

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Data.

___
<a id="isauthenticated"></a>

###  isAuthenticated

▸ **isAuthenticated**(): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [api.ts:141](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L141)*

Is api user authenticated.

*__example__*: // returns boolean if user is logged in or not api.isAuthenticated()

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Data.

___
<a id="isuseradmin"></a>

###  isUserAdmin

▸ **isUserAdmin**(): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [api.ts:155](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L155)*

Is api user admin.

*__example__*: // returns if user has admin rights api.isUserAdmin()

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Data.

___
<a id="resetresult"></a>

### `<Protected>` resetResult

▸ **resetResult**(): `object`

*Defined in [api.ts:244](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L244)*

//TODO: host actions

**Returns:** `object`

___
<a id="returnoneresult"></a>

###  returnOneResult

▸ **returnOneResult**(result: *`any`*, notFroundMessage: *`any`*): [IfcResult](../interfaces/_ifcresult_.ifcresult.md)

*Defined in [api.ts:185](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L185)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| result | `any` |
| notFroundMessage | `any` |

**Returns:** [IfcResult](../interfaces/_ifcresult_.ifcresult.md)

___
<a id="sendrequest"></a>

### `<Private>` sendRequest

▸ **sendRequest**(method: *`string`*, params: *`any`[]*, id: *`number`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [api.ts:204](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/api.ts#L204)*

Generate api call actions.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| method | `string` |  Api function name to call. |
| params | `any`[] |  Array of method parameters. |
| id | `number` |  Id number. |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

___


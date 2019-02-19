[opsi-api](../README.md) > ["group"](../modules/_group_.md) > [Group](../classes/_group_.group.md)

# Class: Group

## Hierarchy

**Group**

## Implemented by

* [OPSIApi](_api_.opsiapi.md)

## Index

### Methods

* [addClientToGroup](_group_.group.md#addclienttogroup)
* [createHostGroup](_group_.group.md#createhostgroup)
* [deleteGroup](_group_.group.md#deletegroup)
* [getAllHostGroups](_group_.group.md#getallhostgroups)
* [getGroupClients](_group_.group.md#getgroupclients)
* [getHostGroupInfo](_group_.group.md#gethostgroupinfo)
* [groupNameExists](_group_.group.md#groupnameexists)
* [removeClientFromGroup](_group_.group.md#removeclientfromgroup)
* [renameGroup](_group_.group.md#renamegroup)
* [updateHostGroup](_group_.group.md#updatehostgroup)

---

## Methods

<a id="addclienttogroup"></a>

###  addClientToGroup

▸ **addClientToGroup**(this: *[OPSIApi](_api_.opsiapi.md)*, clientId: *`string`*, groupId: *`string`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [group.ts:175](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/group.ts#L175)*

add client to group

*__example__*: //returns boolean only on super bad data it will return an error message const { success, data, message } = await api.addClientToGroup() console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message console.log(data) // returns true, false or an error object on fail

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |
| clientId | `string` |  Client ID |
| groupId | `string` |  Group ID |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="createhostgroup"></a>

###  createHostGroup

▸ **createHostGroup**(this: *[OPSIApi](_api_.opsiapi.md)*, groupName: *`string`*, members?: *`string`*, description?: *`string`*, parentGroupId?: *`string`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [group.ts:25](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/group.ts#L25)*

create group

*__example__*: //returns boolean only on super bad data it will return an error message const { success, data, message } = await api.createHostGroup( 'group01', '', 'Group description', '') console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message console.log(data) // data returns also true or an error object on fail

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) | - |
| groupName | `string` | - |  Group ID Name |
| `Default value` members | `string` | &quot;&quot; |  Members Object? String? Array? |
| `Default value` description | `string` | &quot;&quot; |  Group description string |
| `Default value` parentGroupId | `string` | &quot;&quot; |  Parent Group ID Name |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="deletegroup"></a>

###  deleteGroup

▸ **deleteGroup**(this: *[OPSIApi](_api_.opsiapi.md)*, groupId: *`string`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [group.ts:328](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/group.ts#L328)*

delete group if group id string is an empty string all groups would be deleted WARNING!!!

@example //returns boolean only on super bad data it will return an error message const { success, data, message } = await api.deleteGroup('group01') console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message console.log(data) // returns also boolean or an error object on fail

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |
| groupId | `string` |  Group ID |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="getallhostgroups"></a>

###  getAllHostGroups

▸ **getAllHostGroups**(this: *[OPSIApi](_api_.opsiapi.md)*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [group.ts:132](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/group.ts#L132)*

Get all groups.

*__example__*: //returns an array of opsi groups const { success, data, message } = await api.getAllGroups()) console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message console.log(data) // returns array of group infos or an error object on fail

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="getgroupclients"></a>

###  getGroupClients

▸ **getGroupClients**(this: *[OPSIApi](_api_.opsiapi.md)*, groupId: *`string`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [group.ts:224](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/group.ts#L224)*

get clients from group

*__example__*: //return array of clients const { success, data, message } = await api.getGroupClients('group01') console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message console.log(data) // returns array of client ids in group or an error object on fail \[ { groupType: 'HostGroup', ident: 'HostGroup;group01;grouptestclient.opsi.lan', type: 'ObjectToGroup', groupId: 'group01', objectId: 'grouptestclient.opsi.lan' } \]

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |
| groupId | `string` |  Group ID |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="gethostgroupinfo"></a>

###  getHostGroupInfo

▸ **getHostGroupInfo**(this: *[OPSIApi](_api_.opsiapi.md)*, groupName?: *`string`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [group.ts:98](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/group.ts#L98)*

get group info

*__example__*: //returns object with group info const { success, data, message } = await api.getHostGroupInfo('group01') console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message console.log(data) { ident: 'group01', description: 'Group description', notes: '', parentGroupId: null, type: 'HostGroup', id: 'group01' }

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) | - |
| `Default value` groupName | `string` | &quot;&quot; |  Group ID Name |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="groupnameexists"></a>

###  groupNameExists

▸ **groupNameExists**(this: *[OPSIApi](_api_.opsiapi.md)*, groupName: *`string`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [group.ts:151](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/group.ts#L151)*

group name exists

*__example__*: //returns boolean const { success, data, message } = await api.groupNameExists('group01') console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message console.log(data) // returns true, false or an error object on fail

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |
| groupName | `string` |  Group ID Name |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="removeclientfromgroup"></a>

###  removeClientFromGroup

▸ **removeClientFromGroup**(this: *[OPSIApi](_api_.opsiapi.md)*, clientId: *`string`*, groupId: *`string`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [group.ts:259](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/group.ts#L259)*

remove client from group

*__example__*: //returns boolean only on super bad data it will return an error message const { success, data, message } = await api.removeClientFromGroup('grouptestclient.opsi.lan', 'group01') console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message console.log(data) // returns also boolean or an error object on fail

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |
| clientId | `string` |  Client ID |
| groupId | `string` |  Group ID |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="renamegroup"></a>

###  renameGroup

▸ **renameGroup**(this: *[OPSIApi](_api_.opsiapi.md)*, name: *`string`*, newname: *`string`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [group.ts:303](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/group.ts#L303)*

*__example__*: //returns boolean only on super bad data it will return an error message const { success, data, message } = await api.renameGroup('group01', 'group01-renamed') console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message console.log(data) // returns also boolean or an error object on fail

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |
| name | `string` |  old id of the group |
| newname | `string` |  id |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___
<a id="updatehostgroup"></a>

###  updateHostGroup

▸ **updateHostGroup**(this: *[OPSIApi](_api_.opsiapi.md)*, groupObject: *`object`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [group.ts:64](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/group.ts#L64)*

update group

*__example__*: //returns boolean only on super bad data it will return an error message const { success, data, message } = await api.updateHostGroup( {ident: 'group01', note: 'add update note'} ) console.log(success) // if all data are ok then this should return true else false console.log(message) // message is empty if success is true. if success is false there is a error message console.log(data) // data returns also true or an error object on fail

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |
| groupObject | `object` |  group object with ident key |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Object with result data

___


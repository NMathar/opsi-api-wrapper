[opsi-api](../README.md) > ["product"](../modules/_product_.md) > [Product](../classes/_product_.product.md)

# Class: Product

## Hierarchy

**Product**

## Implemented by

* [OPSIApi](_api_.opsiapi.md)

## Index

### Methods

* [getAllActionsForProduct](_product_.product.md#getallactionsforproduct)
* [getAllProducts](_product_.product.md#getallproducts)
* [getProductInfo](_product_.product.md#getproductinfo)

---

## Methods

<a id="getallactionsforproduct"></a>

###  getAllActionsForProduct

▸ **getAllActionsForProduct**(this: *[OPSIApi](_api_.opsiapi.md)*, productid: *`string`*, serverid: *`number`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [product.ts:45](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/product.ts#L45)*

Get all actions for one product.

*__example__*: //returns array of actions for product api.serverIDs() api.actionsForProduct('', servers\[0\])

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |
| productid | `string` |  Any id string. |
| serverid | `number` |  Serverid string that gets from serverIDs. |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Data.

___
<a id="getallproducts"></a>

###  getAllProducts

▸ **getAllProducts**(this: *[OPSIApi](_api_.opsiapi.md)*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [product.ts:14](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/product.ts#L14)*

Get all products.

*__example__*: //returns array of all clients api.getAllProducts()

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>
Data.

___
<a id="getproductinfo"></a>

###  getProductInfo

▸ **getProductInfo**(this: *[OPSIApi](_api_.opsiapi.md)*, productId: *`any`*): `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

*Defined in [product.ts:28](https://github.com/NMathar/opsi-api-wrapper/blob/a88486d/src/product.ts#L28)*

get Product infos

*__example__*: // returns an object of product data api.getProductInfo('swaudit')

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | [OPSIApi](_api_.opsiapi.md) |
| productId | `any` |   |

**Returns:** `Promise`<[IfcResult](../interfaces/_ifcresult_.ifcresult.md)>

___


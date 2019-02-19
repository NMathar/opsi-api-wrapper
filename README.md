# OPSI Api Wrapper

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ce946037f6764ea585c0ee3100a9a814)](https://app.codacy.com/app/NMathar/opsi-api-wrapper?utm_source=github.com&utm_medium=referral&utm_content=NMathar/opsi-api-wrapper&utm_campaign=Badge_Grade_Dashboard)
[![Build Status](https://travis-ci.com/NMathar/opsi-api-wrapper.svg?branch=master)](https://travis-ci.com/NMathar/opsi-api-wrapper)

[![Known Vulnerabilities](https://snyk.io/test/github/NMathar/opsi-api-wrapper/badge.svg?targetFile=package.json)](https://snyk.io/test/github/NMathar/opsi-api-wrapper?targetFile=package.json)

[![dependencies](https://david-dm.org/NMathar/opsi-api-wrapper.svg)](https://david-dm.org/NMathar/opsi-api-wrapper)

[![codecov](https://codecov.io/gh/NMathar/opsi-api-wrapper/branch/master/graph/badge.svg)](https://codecov.io/gh/NMathar/opsi-api-wrapper)

API-Doku: https://nmathar.github.io/opsi-api-wrapper/

This API wrapper provide more readable and documented API Actions against a OPSI Server.

# Usage

```typescript
import {OPSIApi} from './src/api'

const api = new OPSIApi('https://localhost:4447', 'username', 'password');
(async function(){
   const { success, data, message } = await api.createHostGroup(
                       'group01',
                       '',
                       'Group description',
                       '')
       console.log(success) // if all data are ok then this should return true else false
       console.log(message) // message is empty if success is true. if success is false there is a error message
       console.log(data) // data returns also true or an error object on fail
})();
```


# Development 

## Start Docker Dev Environment

`npm run docker:dev-server` 

## Build documentation update

`npm run documentation:build`

## Test with httpie

`echo '{ "method": "group_createHostGroup", "params": ["test_group"], "id": 1 }' | http --verify=no -a opsi:opsi https://localhost:4447/rpc`

`http --verify=no -a opsi:opsi https://localhost:4447/rpc < test/testdata/client.json`

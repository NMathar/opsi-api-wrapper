# OPSI Api Wrapper

API-Doku: https://nmathar.github.io/opsi-api-wrapper/

This API wrapper provide more readable and documented API Actions against a OPSI Server.

## Start Docker Dev Environment

`npm run docker:dev-server` 

## Build documentation update

`npm run documentation:build`

## Test with httpie

`echo '{ "method": "group_createHostGroup", "params": ["test_group"], "id": 1 }' | http --verify=no -a opsi:opsi https://localhost:4447/rpc`

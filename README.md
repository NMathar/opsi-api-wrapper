# OPSI Api Wrapper

[![Build Status](https://travis-ci.com/NMathar/opsi-api-wrapper.svg?branch=master)](https://travis-ci.com/NMathar/opsi-api-wrapper)

[![Known Vulnerabilities](https://snyk.io/test/github/NMathar/opsi-api-wrapper/badge.svg?targetFile=package.json)](https://snyk.io/test/github/NMathar/opsi-api-wrapper?targetFile=package.json)

[![dependencies](https://david-dm.org/NMathar/opsi-api-wrapper.svg)](https://david-dm.org/NMathar/opsi-api-wrapper)

API-Doku: https://nmathar.github.io/opsi-api-wrapper/

This API wrapper provide more readable and documented API Actions against a OPSI Server.

## Start Docker Dev Environment

`npm run docker:dev-server` 

## Build documentation update

`npm run documentation:build`

## Test with httpie

`echo '{ "method": "group_createHostGroup", "params": ["test_group"], "id": 1 }' | http --verify=no -a opsi:opsi https://localhost:4447/rpc`

`http --verify=no -a opsi:opsi https://localhost:4447/rpc < test/testdata/client.json`

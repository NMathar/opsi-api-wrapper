import {expect, assert, should} from 'chai';
import {OPSIApi} from "../src/api";

describe('Test OPSI API Login', function () {
    this.timeout(15000)

    describe('Api Login Fail', function () {
        it('Login Fail or connection problem', async () => {
            let api = new OPSIApi('https://localhost:4447', 'opsi', 'FAIL')
            // assert.isObject(api)
            let {success, message} = await api.getOpsiVersion()
            console.error(message)
            // console.log(data)
            assert.isFalse(success)
        })

        it('Login Fail missing parameter', function () {
            should().throw(() => {
                new OPSIApi('https://localhost:4447', 'opsi', '')
            })
        })
    })

    describe('Api Login Success', function () {
        it('Login Success', function () {
            should().not.throw(() => {
                new OPSIApi('https://localhost:4447', 'opsi', 'opsi')
            })
        })
    })
})

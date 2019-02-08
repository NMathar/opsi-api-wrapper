import {OPSIApi} from "./api";
import {Result} from "./IfcResult";

class Group {

    /**
     * create group
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     * api.createHostGroup(
     *                    'groupName',
     *                    'members',
     *                    'description',
     *                    'parentGroupId', function (res) {
     * 		if(!res.success){
     *			console.error(res.message) // client error message
     *		}else if(res.success){
     *		  	console.log(res.data) // true
     *		}
     * })
     * @param {string} groupName - Group ID Name
     * @param {string} members - Members Object? String? Array?
     * @param {string} description - Group description string
     * @param {string} parentGroupId - Parent Group ID Name
     * @returns {Result} Boolean or Object with error message (Object.message).
     */
    async createHostGroup(this: OPSIApi, groupName, members = '', description = '', parentGroupId = ''): Promise<Result> {
        this.resetResult();
        if (!groupName || groupName === ''){
            this.res.message = 'Please define a group name!!'
            return this.res
        }

        let result = await this.sendRequest('createGroup', [
            groupName,
            members,
            description,
            parentGroupId,
        ], this.id)

        if (result.message === "" || !result.message)
            return {success: true, message: '', data: true}

        return result
    }


    /**
     * get group info
     *
     * @example
     * //returns object with group info
     * api.getHostGroupInfo(
     *                    'groupName',
     *                    function (res) {
     * 		if(res.success){
     *			console.log(res.data) // client data
     *		}else if(res){
     *		  	console.error(res.message) // error message
     *		}
     * })
     * @param {string} groupName - Group ID Name
     * @returns {Result} Object of group data.
     */
    async getHostGroupInfo(this:OPSIApi, groupName = ''): Promise<Result> {
        this.resetResult();
        if (!groupName || groupName === ''){
            this.res.message = 'Please define a group name!'
            return this.res
        }

        let result = await this.sendRequest('group_getObjects', [
            '',
            {
                'id': groupName,
                'type': 'HostGroup'
            }
        ], this.id)
        // console.log(data)
        if (result.success)
            result.data = result.data[0]

        return result
    }

    /**
     * Get all groups.
     *
     * @exmaple
     * //returns an array of opsi groups
     * api.getAllGroups(function (res) {
     * 		if(res.success)
     *			console.log(res.data) // groups array
     *		}else if(!res.success){
     *		  	console.error(res.message)
     *		}
     *    })
     * @param {requestCallback} callback - The callback that handles the response.
     * @returns {Result} Data.
     */
    async getAllHostGroups(this: OPSIApi): Promise<Result> {
        this.resetResult();
        return await this.sendRequest('group_getObjects', [], this.id)
    }


    /**
     * group name exists
     *
     * @example
     * //returns boolean
     * api.groupNameExists('groupName')
     *
     * @param {string} groupName - Group ID Name
     * @returns {Result} Object
     */
    async groupNameExists(this:OPSIApi, groupName): Promise<Result> {
        this.resetResult();
        if (!groupName || groupName === ''){
            this.res.message = 'Please define a group name!'
            return this.res
        }

        return await this.sendRequest('groupname_exists', [
            groupName
        ], this.id)
    }

    /**
     * add client to group
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     *
     * api.addClientToGroup()
     * @param {string} clientId - Client ID
     * @param {string} groupId - Group ID
     * @returns {Result} Boolean or Object with error message (Object.message).
     */
    async addClientToGroup(this: OPSIApi, clientId, groupId): Promise<Result> {
        this.resetResult();
        if (!groupId || groupId === '' || !clientId || clientId === ''){
            this.resetResult();
            this.res.message = 'Please define a group id and a client id!'
            return this.res
        }

        let groupExist = await this.groupNameExists(groupId)
        if(!groupExist.data){
            this.resetResult();
            this.res.message = 'Group not exists!'
            return this.res
        }

        let clientExist = await this.getClientInfo(clientId)
        if(!clientExist.success){
            this.resetResult();
            this.res.message = 'Client not exists!'
            return this.res
        }

        let result = await this.sendRequest('objectToGroup_create', [
                            'HostGroup',
                            groupId,
                            clientId
                        ], this.id)

        if (result.message === "" || !result.message)
            return {success: true, message: '', data: true}

        return result
    }

    /**
     * get clients from group
     *
     * @example
     * //return array of clients
     *
     * api.getGroupClients(groupId)
     *
     * @param {string} groupId - Group ID
     * @returns {Result} Array with clients or empty array.
     */
    async getGroupClients(this: OPSIApi, groupId): Promise<Result> {
        this.resetResult();
        if (!groupId || groupId === ''){
            this.resetResult();
            this.res.message = 'Please define a groupId!'
            return this.res
        }

        return await this.sendRequest('objectToGroup_getObjects', [
            '',
            {
                'groupType': 'HostGroup',
                'groupId': groupId
            }
        ], this.id)
    }

    /**
     * remove client from group
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     *
     * api.removeClientFromGroup(clientId, groupId)
     *
     * @param {string} clientId - Client ID
     * @param {string} groupId - Group ID
     * @returns {Result} Boolean or Object with error message (Object.message).
     */
    async removeClientFromGroup(this: OPSIApi, clientId, groupId): Promise<Result> {
        this.resetResult();
        if (!groupId || groupId === '' || !clientId || clientId === ''){
            this.resetResult();
            this.res.message = 'Please define a group id and a client id!'
            return this.res
        }

        let groupExist = await this.groupNameExists(groupId)
        if(!groupExist.data){
            this.resetResult();
            this.res.message = 'Group not exists!'
            return this.res
        }

        let clientExist = await this.getClientInfo(clientId)
        if(!clientExist.success){
            this.resetResult();
            this.res.message = 'Client not exists!'
            return this.res
        }

        let result = await this.sendRequest('objectToGroup_delete', [
            'HostGroup',
            groupId,
            clientId
        ], this.id)
        this.resetResult();
        if (result.message === "" || !result.message)
            return {success: true, message: '', data: true}

        return result
    }


    /**
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     *
     * api.renameGroup(name, newname, function (res) {
     * 		if(!res.success){
     *			console.error(res.message) // group error message
     *		}else if(res.success){
     *		  	console.log(res.data) // true
     *		}
     * })
     *
     * @param {string} name old id of the group
     * @param {string} newname id
     * @returns {Result} Boolean or Object with error message (Object.message).
     */
    async renameGroup(this: OPSIApi, name, newname): Promise<Result> {
        this.resetResult();
        let result =  await this.sendRequest('group_rename', [
            name,
            newname
        ], this.id)

        if (result.message === "" || !result.message)
            return {success: true, message: '', data: true}

        return result
    }
}

export {Group}

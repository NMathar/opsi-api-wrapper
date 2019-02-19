"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Group {
    /**
     * create group
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     * const { success, data, message } = await api.createHostGroup(
     *                    'group01',
     *                    '',
     *                    'Group description',
     *                    '')
     * console.log(success) // if all data are ok then this should return true else false
     * console.log(message) // message is empty if success is true. if success is false there is a error message
     * console.log(data) // data returns also true or an error object on fail
     *
     * @param {string} groupName - Group ID Name
     * @param {string} members - Members Object? String? Array?
     * @param {string} description - Group description string
     * @param {string} parentGroupId - Parent Group ID Name
     * @returns {IfcResult} Object with result data
     */
    createHostGroup(groupName, members = '', description = '', parentGroupId = '') {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetResult();
            if (!groupName || groupName === '') {
                this.res.message = 'Please define a group name!!';
                return this.res;
            }
            const result = yield this.sendRequest('createGroup', [groupName, members, description, parentGroupId], this.id);
            if (result.message === '' || !result.message) {
                return { success: true, message: '', data: true };
            }
            return result;
        });
    }
    /**
     * get group info
     *
     * @example
     * //returns object with group info
     * const { success, data, message } = await api.getHostGroupInfo('group01')
     * console.log(success) // if all data are ok then this should return true else false
     * console.log(message) // message is empty if success is true. if success is false there is a error message
     * console.log(data)
     * { ident: 'group01',
     *   description: 'Group description',
     *   notes: '',
     *   parentGroupId: null,
     *   type: 'HostGroup',
     *   id: 'group01' }
     *
     * @param {string} groupName - Group ID Name
     * @returns {IfcResult} Object with result data
     */
    getHostGroupInfo(groupName = '') {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetResult();
            if (!groupName || groupName === '') {
                this.res.message = 'Please define a group name!';
                return this.res;
            }
            const result = yield this.sendRequest('group_getObjects', [
                '',
                {
                    id: groupName,
                    type: 'HostGroup',
                },
            ], this.id);
            // console.log(data)
            if (result.success) {
                result.data = result.data[0];
            }
            return result;
        });
    }
    /**
     * Get all groups.
     *
     * @example
     * //returns an array of opsi groups
     * const { success, data, message } = await api.getAllGroups())
     * console.log(success) // if all data are ok then this should return true else false
     * console.log(message) // message is empty if success is true. if success is false there is a error message
     * console.log(data) // returns array of group infos or an error object on fail
     *
     * @returns {IfcResult} Object with result data
     */
    getAllHostGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetResult();
            return yield this.sendRequest('group_getObjects', [], this.id);
        });
    }
    /**
     * group name exists
     *
     * @example
     * //returns boolean
     * const { success, data, message } = await api.groupNameExists('group01')
     * console.log(success) // if all data are ok then this should return true else false
     * console.log(message) // message is empty if success is true. if success is false there is a error message
     * console.log(data) // returns true, false or an error object on fail
     *
     *
     * @param {string} groupName - Group ID Name
     * @returns {IfcResult} Object with result data
     */
    groupNameExists(groupName) {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetResult();
            if (!groupName || groupName === '') {
                this.res.message = 'Please define a group name!';
                return this.res;
            }
            return yield this.sendRequest('groupname_exists', [groupName], this.id);
        });
    }
    /**
     * add client to group
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     * const { success, data, message } = await api.addClientToGroup()
     * console.log(success) // if all data are ok then this should return true else false
     * console.log(message) // message is empty if success is true. if success is false there is a error message
     * console.log(data) // returns true, false or an error object on fail
     *
     * @param {string} clientId - Client ID
     * @param {string} groupId - Group ID
     * @returns {IfcResult} Object with result data
     */
    addClientToGroup(clientId, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetResult();
            if (!groupId || groupId === '' || !clientId || clientId === '') {
                this.resetResult();
                this.res.message = 'Please define a group id and a client id!';
                return this.res;
            }
            const groupExist = yield this.groupNameExists(groupId);
            if (!groupExist.data) {
                this.resetResult();
                this.res.message = 'Group not exists!';
                return this.res;
            }
            const clientExist = yield this.getClientInfo(clientId);
            if (!clientExist.success) {
                this.resetResult();
                this.res.message = 'Client not exists!';
                return this.res;
            }
            const result = yield this.sendRequest('objectToGroup_create', ['HostGroup', groupId, clientId], this.id);
            if (result.message === '' || !result.message) {
                return { success: true, message: '', data: true };
            }
            return result;
        });
    }
    /**
     * get clients from group
     *
     * @example
     * //return array of clients
     * const { success, data, message } = await api.getGroupClients('group01')
     * console.log(success) // if all data are ok then this should return true else false
     * console.log(message) // message is empty if success is true. if success is false there is a error message
     * console.log(data) // returns array of client ids in group or an error object on fail
     * [ { groupType: 'HostGroup',
     * ident: 'HostGroup;group01;grouptestclient.opsi.lan',
     * type: 'ObjectToGroup',
     * groupId: 'group01',
     * objectId: 'grouptestclient.opsi.lan' } ]
     *
     * @param {string} groupId - Group ID
     * @returns {IfcResult} Object with result data
     */
    getGroupClients(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetResult();
            if (!groupId || groupId === '') {
                this.resetResult();
                this.res.message = 'Please define a groupId!';
                return this.res;
            }
            return yield this.sendRequest('objectToGroup_getObjects', [
                '',
                {
                    groupId,
                    groupType: 'HostGroup',
                },
            ], this.id);
        });
    }
    /**
     * remove client from group
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     * const { success, data, message } = await api.removeClientFromGroup('grouptestclient.opsi.lan', 'group01')
     * console.log(success) // if all data are ok then this should return true else false
     * console.log(message) // message is empty if success is true. if success is false there is a error message
     * console.log(data) // returns also boolean or an error object on fail
     *
     * @param {string} clientId - Client ID
     * @param {string} groupId - Group ID
     * @returns {IfcResult} Object with result data
     */
    removeClientFromGroup(clientId, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetResult();
            if (!groupId || groupId === '' || !clientId || clientId === '') {
                this.resetResult();
                this.res.message = 'Please define a group id and a client id!';
                return this.res;
            }
            const groupExist = yield this.groupNameExists(groupId);
            if (!groupExist.data) {
                this.resetResult();
                this.res.message = 'Group not exists!';
                return this.res;
            }
            const clientExist = yield this.getClientInfo(clientId);
            if (!clientExist.success) {
                this.resetResult();
                this.res.message = 'Client not exists!';
                return this.res;
            }
            const result = yield this.sendRequest('objectToGroup_delete', ['HostGroup', groupId, clientId], this.id);
            this.resetResult();
            if (result.message === '' || !result.message) {
                return { success: true, message: '', data: true };
            }
            return result;
        });
    }
    /**
     *
     * @example
     * //returns boolean only on super bad data it will return an error message
     * const { success, data, message } = await api.renameGroup('group01', 'group01-renamed')
     * console.log(success) // if all data are ok then this should return true else false
     * console.log(message) // message is empty if success is true. if success is false there is a error message
     * console.log(data) // returns also boolean or an error object on fail
     *
     * @param {string} name old id of the group
     * @param {string} newname id
     * @returns {IfcResult} Object with result data
     */
    renameGroup(name, newname) {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetResult();
            const result = yield this.sendRequest('group_rename', [name, newname], this.id);
            if (result.message === '' || !result.message) {
                return { success: true, message: '', data: true };
            }
            return result;
        });
    }
    /**
     * delete group
     * if group id string is an empty string all groups would be deleted WARNING!!!
     *
     *  @example
     * //returns boolean only on super bad data it will return an error message
     * const { success, data, message } = await api.deleteGroup('group01')
     * console.log(success) // if all data are ok then this should return true else false
     * console.log(message) // message is empty if success is true. if success is false there is a error message
     * console.log(data) // returns also boolean or an error object on fail
     *
     * @param {string} groupId - Group ID
     * @returns {IfcResult} Object with result data
     */
    deleteGroup(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetResult();
            if (!groupId || groupId === '') {
                this.resetResult();
                this.res.message = 'Please define a groupId!';
                return this.res;
            }
            const result = yield this.sendRequest('group_delete', [groupId], this.id);
            if (result.message === '' || !result.message) {
                return { success: true, message: '', data: true };
            }
            return result;
        });
    }
}
exports.Group = Group;
//# sourceMappingURL=group.js.map
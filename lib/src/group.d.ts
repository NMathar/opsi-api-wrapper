import { OPSIApi } from './api';
import { IfcResult } from './IfcResult';
declare class Group {
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
    createHostGroup(this: OPSIApi, groupName: any, members?: string, description?: string, parentGroupId?: string): Promise<IfcResult>;
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
    getHostGroupInfo(this: OPSIApi, groupName?: string): Promise<IfcResult>;
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
    getAllHostGroups(this: OPSIApi): Promise<IfcResult>;
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
    groupNameExists(this: OPSIApi, groupName: any): Promise<IfcResult>;
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
    addClientToGroup(this: OPSIApi, clientId: any, groupId: any): Promise<IfcResult>;
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
    getGroupClients(this: OPSIApi, groupId: any): Promise<IfcResult>;
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
    removeClientFromGroup(this: OPSIApi, clientId: any, groupId: any): Promise<IfcResult>;
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
    renameGroup(this: OPSIApi, name: any, newname: any): Promise<IfcResult>;
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
    deleteGroup(this: OPSIApi, groupId: any): Promise<IfcResult>;
}
export { Group };

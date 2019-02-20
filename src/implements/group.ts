import { OPSIApi } from '../api';
import { IfcResult } from '../interfaces/IfcResult';

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
  public async createHostGroup(
    this: OPSIApi,
    groupName:string,
    members:string = '',
    description:string = '',
    parentGroupId:string = '',
  ): Promise<IfcResult> {
    this.resetResult();
    if (!groupName || groupName === '') {
      this.res.message = 'Please define a group name!!';
      return this.res;
    }

    const result = await this.sendRequest('createGroup', [groupName, members, description, parentGroupId], this.id);

    if (result.message === '' || !result.message) {
      return { success: true, message: '', data: true };
    }

    return result;
  }


  /**
   * update group
   *
   * @example
   * //returns boolean only on super bad data it will return an error message
   * const { success, data, message } = await api.updateHostGroup(
   * {ident: 'group01', note: 'add update note'}
   * )
   * console.log(success) // if all data are ok then this should return true else false
   * console.log(message) // message is empty if success is true. if success is false there is a error message
   * console.log(data) // data returns also true or an error object on fail
   *
   *
   * @param {Object} groupObject - group object with ident key
   * @returns {IfcResult} Object with result data
   */
  public async updateHostGroup(
    this: OPSIApi,
    groupObject: object,
  ): Promise<IfcResult> {
    this.resetResult();

    const result = await this.sendRequest('group_updateObject', [groupObject], this.id);

    if (result.message === '' || !result.message) {
      return { success: true, message: '', data: true };
    }

    return result;
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
  public async getHostGroupInfo(this: OPSIApi, groupName:string = ''): Promise<IfcResult> {
    this.resetResult();
    if (!groupName || groupName === '') {
      this.res.message = 'Please define a group name!';
      return this.res;
    }

    const result = await this.sendRequest(
      'group_getObjects',
      [
        '',
        {
          id: groupName,
          type: 'HostGroup',
        },
      ],
      this.id,
    );

    return this.returnOneResult(result, 'group not found!');
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
  public async getAllHostGroups(this: OPSIApi): Promise<IfcResult> {
    this.resetResult();
    return await this.sendRequest('group_getObjects', [], this.id);
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
  public async groupNameExists(this: OPSIApi, groupName:string): Promise<IfcResult> {
    this.resetResult();
    if (!groupName || groupName === '') {
      this.res.message = 'Please define a group name!';
      return this.res;
    }

    return await this.sendRequest('groupname_exists', [groupName], this.id);
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
  public async addClientToGroup(this: OPSIApi, clientId:string, groupId:string): Promise<IfcResult> {
    this.resetResult();
    if (!groupId || groupId === '' || !clientId || clientId === '') {
      this.resetResult();
      this.res.message = 'Please define a group id and a client id!';
      return this.res;
    }

    const groupExist = await this.groupNameExists(groupId);
    if (!groupExist.data) {
      this.resetResult();
      this.res.message = 'Group not exists!';
      return this.res;
    }

    const clientExist = await this.getClientInfo(clientId);
    if (!clientExist.success) {
      this.resetResult();
      this.res.message = 'Client not exists!';
      return this.res;
    }

    const result = await this.sendRequest('objectToGroup_create', ['HostGroup', groupId, clientId], this.id);

    if (result.message === '' || !result.message) {
      return { success: true, message: '', data: true };
    }

    return result;
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
  public async getGroupClients(this: OPSIApi, groupId:string): Promise<IfcResult> {
    this.resetResult();
    if (!groupId || groupId === '') {
      this.resetResult();
      this.res.message = 'Please define a groupId!';
      return this.res;
    }

    return await this.sendRequest(
      'objectToGroup_getObjects',
      [
        '',
        {
          groupId,
          groupType: 'HostGroup',
        },
      ],
      this.id,
    );
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
  public async removeClientFromGroup(this: OPSIApi, clientId:string, groupId:string): Promise<IfcResult> {
    this.resetResult();
    if (!groupId || groupId === '' || !clientId || clientId === '') {
      this.resetResult();
      this.res.message = 'Please define a group id and a client id!';
      return this.res;
    }

    const groupExist = await this.groupNameExists(groupId);
    if (!groupExist.data) {
      this.resetResult();
      this.res.message = 'Group not exists!';
      return this.res;
    }

    const clientExist = await this.getClientInfo(clientId);
    if (!clientExist.success) {
      this.resetResult();
      this.res.message = 'Client not exists!';
      return this.res;
    }

    const result = await this.sendRequest('objectToGroup_delete', ['HostGroup', groupId, clientId], this.id);
    this.resetResult();
    if (result.message === '' || !result.message) {
      return { success: true, message: '', data: true };
    }

    return result;
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
  public async renameGroup(this: OPSIApi, name:string, newname:string): Promise<IfcResult> {
    this.resetResult();
    const result = await this.sendRequest('group_rename', [name, newname], this.id);

    if (result.message === '' || !result.message) {
      return { success: true, message: '', data: true };
    }

    return result;
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
  public async deleteGroup(this: OPSIApi, groupId:string): Promise<IfcResult> {
    this.resetResult();
    if (!groupId || groupId === '') {
      this.resetResult();
      this.res.message = 'Please define a groupId!';
      return this.res;
    }

    const result = await this.sendRequest('group_delete', [groupId], this.id);

    if (result.message === '' || !result.message) {
      return { success: true, message: '', data: true };
    }

    return result;
  }
}

export { Group };

import { OPSIApi } from './api';
import { IfcResult } from './IfcResult';

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
   *                    'parentGroupId')
   *
   * @param {string} groupName - Group ID Name
   * @param {string} members - Members Object? String? Array?
   * @param {string} description - Group description string
   * @param {string} parentGroupId - Parent Group ID Name
   * @returns {IfcResult} Boolean or Object with error message (Object.message).
   */
  public async createHostGroup(
    this: OPSIApi,
    groupName,
    members = '',
    description = '',
    parentGroupId = '',
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
   * get group info
   *
   * @example
   * //returns object with group info
   * api.getHostGroupInfo(
   *                    'groupName')
   * @param {string} groupName - Group ID Name
   * @returns {IfcResult} Object of group data.
   */
  public async getHostGroupInfo(this: OPSIApi, groupName = ''): Promise<IfcResult> {
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
    // console.log(data)
    if (result.success) {
      result.data = result.data[0];
    }

    return result;
  }

  /**
   * Get all groups.
   *
   * @exmaple
   * //returns an array of opsi groups
   * api.getAllGroups())
   *
   * @returns {IfcResult} Data.
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
   * api.groupNameExists('groupName')
   *
   * @param {string} groupName - Group ID Name
   * @returns {IfcResult} Object
   */
  public async groupNameExists(this: OPSIApi, groupName): Promise<IfcResult> {
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
   *
   * api.addClientToGroup()
   * @param {string} clientId - Client ID
   * @param {string} groupId - Group ID
   * @returns {IfcResult} Boolean or Object with error message (Object.message).
   */
  public async addClientToGroup(this: OPSIApi, clientId, groupId): Promise<IfcResult> {
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
   *
   * api.getGroupClients(groupId)
   *
   * @param {string} groupId - Group ID
   * @returns {IfcResult} Array with clients or empty array.
   */
  public async getGroupClients(this: OPSIApi, groupId): Promise<IfcResult> {
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
          groupId: groupId,
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
   *
   * api.removeClientFromGroup(clientId, groupId)
   *
   * @param {string} clientId - Client ID
   * @param {string} groupId - Group ID
   * @returns {IfcResult} Boolean or Object with error message (Object.message).
   */
  public async removeClientFromGroup(this: OPSIApi, clientId, groupId): Promise<IfcResult> {
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
   *
   * api.renameGroup(name, newname)
   *
   * @param {string} name old id of the group
   * @param {string} newname id
   * @returns {IfcResult} Boolean or Object with error message (Object.message).
   */
  public async renameGroup(this: OPSIApi, name, newname): Promise<IfcResult> {
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
   *
   * api.delete(groupId)
   *
   * @param {string} groupId - Group ID
   * @returns {IfcResult}
   */
  public async deleteGroup(this: OPSIApi, groupId): Promise<IfcResult> {
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

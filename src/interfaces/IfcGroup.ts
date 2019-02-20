
enum EGroupType {
  HostGroup = 'HostGroup',
  ProductGroup = 'ProductGroup'
}

/**
 * Group Interface
 */
export interface IfcGroup {
  ident: string;
  description?: string;
  notes?: string;
  parentGroupId?: string;
  type: EGroupType;
  id: string;
}

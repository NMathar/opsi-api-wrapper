enum EHostType {
  OpsiClient = 'OpsiClient',
OpsiConfigserver = 'OpsiConfigserver'
}

export interface IfcHost {
  ident: string;
  description?: string;
  created?: string;
  inventoryNumber?: string;
  ipAddress?: string;
  notes?: string;
  oneTimePassword?: null,
  lastSeen?: string;
  hardwareAddress?: string;
  opsiHostKey?: string;
  type: EHostType;
  id: string;
}

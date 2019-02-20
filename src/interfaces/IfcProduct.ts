
export interface IfcProduct {
    onceScript?: string;
    ident: string;
    windowsSoftwareIds?: Array<String>;
    description?: string;
    setupScript: string;
    changelog?: string;
    customScript?: string;
    advice?: string;
    uninstallScript?: string;
    userLoginScript?: string;
    name: string;
    priority: number;
    packageVersion: string;
    productVersion?: string;
    updateScript?: string;
    productClassIds?: Array<String>;
    alwaysScript: string;
    type: string;
    id: string;
    licenseRequired: boolean;
}
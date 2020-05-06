export enum SystemType {
    UNIX = 'UNIX',
    WINDOWS = 'WINDOWS'
}
export interface IMachine {
    id?: number;
    ip?: string;
    hostname?: string;
    password?: string;
    port?: string;
    system?: SystemType
}

export class Machine implements IMachine {
    constructor(
        public id?: number,
        public ip?: string,
        public hostname?: string,
        public password?: string,
        public port?: string,
        public system?: SystemType
    ) { }
}
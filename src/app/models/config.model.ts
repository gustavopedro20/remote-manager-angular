
export interface IConfig {
    id?: number;
    email?: string;
    maxMenInPercent?: number;
    maxDiscInPercent?: number;
    maxCPUInPercent?: number;
}

export class Config implements IConfig {
    constructor(
        public id?: number,
        public email?: string,
        public maxMenInPercent?: number,
        public maxDiscInPercent?: number,
        public maxCPUInPercent?: number
    ) { }
}

export interface StatisticsTemp {
    cpu?: CPU;
    'e/s'?: ES;
    memory?: Memory;
    process?: Process;
    swap?: Swap;
    system?: System;
}

interface CPU {
    id?: string;
    st?: string;
    sy?: string;
    us?: string;
    wa?: string;
}

interface ES {
    bi?: string;
    bo?: string;
}

interface Memory {
    buff?: string;
    cache?: string;
    free?: string;
    swpd?: string;
}

interface Process {
    b?: string;
    r?: string;
}

interface Swap {
    si?: string;
    so?: string;
}

interface System {
    cs?: string;
    in?: string;
}

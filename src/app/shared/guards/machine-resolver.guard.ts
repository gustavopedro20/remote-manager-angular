import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';

import { Machine } from 'src/app/models/machine.model';
import { MachineService } from 'src/app/shared/services/machine.service';
import { SshService } from '../services/ssh.service';
import { ITaskMenDiskDTO } from 'src/app/models/dto/tasks-men-diskDTO';

@Injectable({
    providedIn: 'root'
})
export class MachineResolverGuard implements Resolve<Machine | ITaskMenDiskDTO> {

    constructor(
        private machineService: MachineService,
        private sshService: SshService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Machine> | Observable<ITaskMenDiskDTO>{
        if (route.params && route.params.id) {
            return this.machineService.find(route.params.id);
        } else if (route.params && route.params.ip) {
            // return this.sshService.getAllTasksAndMen();
            return null;
        } else {
            return of(new Machine(null, null, null, null));
        }
    }
}

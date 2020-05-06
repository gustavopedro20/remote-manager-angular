import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Machine, IMachine, SystemType } from 'src/app/models/machine.model';
import { MachineService } from 'src/app/shared/services/machine.service';

@Injectable({
    providedIn: 'root'
})
export class MachineResolverGuard implements Resolve<Machine> {

    constructor(private service: MachineService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Machine> {
        if (route.params && route.params['id']) {
            //   return this.service.loadByID(route.params['id']);
            const m: IMachine = {};
            m.id = route.params['id'];
            m.ip = '192.168.1.1';
            m.hostname = 'machine';
            m.password = 'user-pass'
            m.port = '22'
            m.system = SystemType.UNIX
            return of(m);
        }

        return of(new Machine(null, null, null, null));
    }
}
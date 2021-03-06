import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMachine } from 'src/app/models/machine.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  resourceUrl = environment.API_URL + '/api/machines';

  constructor(private http: HttpClient) { }

  findAll(): Observable<IMachine[]> {
    return this.http.get<IMachine[]>(this.resourceUrl);
  }

  find(machineId: number): Observable<IMachine> {
    return this.http.get(this.resourceUrl + '/' + machineId);
  }

  delete(machineId: number): Observable<IMachine> {
    return this.http.delete(this.resourceUrl + '/' + machineId);
  }

  create(machine: IMachine): Observable<IMachine> {
    return this.http.post(this.resourceUrl, machine);
  }

  update(machine: IMachine): Observable<IMachine> {
    return this.http.put(this.resourceUrl, machine);
  }
}

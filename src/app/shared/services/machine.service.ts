import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMachine, Machine } from 'src/app/models/machine.model';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  resourceUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  findAll(): Observable<IMachine[]> {
    return this.http.get<IMachine[]>(this.resourceUrl + '/api/machines');
  }

  find(machineId: number): Observable<IMachine> {
    return this.http.get(this.resourceUrl + '/api/machines' + machineId);
  }

  delete(machineId: number): Observable<IMachine> {
    return this.http.delete(this.resourceUrl + '/api/machines/' + machineId);
  }

  create(machine: Machine | IMachine): Observable<IMachine> {
    return this.http.post(this.resourceUrl + '/api/machines', machine);
  }

  update(machine: Machine | IMachine): Observable<IMachine> {
    return this.http.put(this.resourceUrl + '/api/machines', machine);
  }

}

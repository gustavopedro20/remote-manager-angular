import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMachine, Machine } from 'src/app/models/machine.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

<<<<<<< HEAD
  resourceUrl = 'http://localhost:5000';
=======
  // resourceUrl = 'http://localhost:3000/machines';
  resourceUrl = environment.API_URL + '/api/machines';
>>>>>>> d337d82e6357f6b6790691952028e97070ba9b99

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

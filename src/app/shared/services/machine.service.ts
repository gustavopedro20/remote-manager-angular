import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMachine } from 'src/app/models/machine.model';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<IMachine[]> {
    return this.http.get<IMachine[]>('https://raw.githubusercontent.com/gustavopedro20/json-data/master/machines.json');
  }

}

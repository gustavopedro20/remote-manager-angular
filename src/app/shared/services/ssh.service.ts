import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatisticsTemp } from 'src/app/models/statistics-temp.model';

@Injectable({
  providedIn: 'root'
})
export class SshService {

  constructor(private http: HttpClient) { }

  getStatisticsTemp(): Observable<StatisticsTemp> {
    return this.http.get('http://localhost:5000/cpu/statistics')
  }

}

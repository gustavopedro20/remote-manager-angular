import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { StatisticsTemp } from 'src/app/models/statistics-temp.model';
import { ITask } from 'src/app/models/task.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SshService {

  constructor(private http: HttpClient) { }

  getSwapStatistics(): Observable<StatisticsTemp> {
    return this.http.get(`${environment.API_URL}/swap/statistics`);
  }

  getAllTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${environment.API_URL}/tasks`).pipe(
      map(t => this.sortDesc(t))
    );
  }

  sortDesc(tasks: ITask[]) {
    return tasks.sort((one, two) => (+one.PID > +two.PID ? 1 : -1));
  }

  deleteTask(pid: string) {
    return this.http.delete(`${environment.API_URL}/tasks?pid=${pid}`);
  }

}

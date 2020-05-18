import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { StatisticsTemp } from 'src/app/models/statistics-temp.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SshService {

  constructor(private http: HttpClient) { }

  getSwapStatistics(): Observable<StatisticsTemp> {
    return this.http.get(`${environment.API_URL}/swap/statistics`);
  }

  /*getAllTasksAndMen(): Observable<ITaskMenDiskDTO> {
    return this.http.get<ITaskMenDiskDTO>(`${environment.API_URL}/tasks`).pipe(
      tap(tm => {
        this.sortDesc(tm.tasks);
        tm.men['buff/cache'] = tm.men['buff/cache'] / 1000;
        tm.men.free = tm.men.free / 1000;
        tm.men.total = tm.men.total / 1000;
        tm.men.used = tm.men.used / 1000;
      })
    );
  }*/

  /*getDiskUsage(): Observable<IDiskUsage> {
    return this.http.get<IDiskUsage>(`${environment.API_URL}/disk-usage`)
      .pipe(tap(d => {
        d.free = d.free / 1000;
        d.total = d.total / 1000;
        d.usage = d.usage / 1000;
      }));
  }*/

  /*sortDesc(tasks: ITask[]) {
    return tasks.sort((one, two) => (+one.PID > +two.PID ? 1 : -1));
  }*/

  deleteTask(pid: string) {
    return this.http.delete(`${environment.API_URL}/tasks?pid=${pid}`);
  }

}

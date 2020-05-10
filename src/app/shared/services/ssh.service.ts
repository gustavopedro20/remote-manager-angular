import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { StatisticsTemp } from 'src/app/models/statistics-temp.model';
import { ITask } from 'src/app/models/task.model';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { ITaskMen } from 'src/app/models/dto/tasks-menDTO';

@Injectable({
  providedIn: 'root'
})
export class SshService {

  constructor(private http: HttpClient) { }

  getSwapStatistics(): Observable<StatisticsTemp> {
    return this.http.get(`${environment.API_URL}/swap/statistics`);
  }

  getAllTasksAndMen(): Observable<ITaskMen> {
    return this.http.get<ITaskMen>(`${environment.API_URL}/tasks`).pipe(
      tap(tm => {
        this.sortDesc(tm.tasks);
        tm.men['buff/cache'] = tm.men['buff/cache'] / 1000;
        tm.men.free = tm.men.free / 1000;
        tm.men.total = tm.men.total / 1000;
        tm.men.used = tm.men.used / 1000;
      })
    );
  }

  sortDesc(tasks: ITask[]) {
    return tasks.sort((one, two) => (+one.PID > +two.PID ? 1 : -1));
  }

  deleteTask(pid: string) {
    return this.http.delete(`${environment.API_URL}/tasks?pid=${pid}`);
  }

}

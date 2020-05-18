import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket = null;

  constructor() {
    this.socket = io(environment.API_URL);
  }

  public getMessages = (room: string) => {
    return new Observable((observer) => {
      this.socket.on(room, (message: any) => {
        observer.next(message);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}

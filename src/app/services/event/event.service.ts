import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Event } from '../../type/interfaces/event.interface';

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Array<Event>> {
    return this.http
      .get<ApiResponse<Array<Event>>>('/events')
      .pipe(map((response) => response.data));
  }
}

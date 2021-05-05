import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import { Actor } from '../models/actor.model';

const baseUrl = environment.baseUrl + 'actors';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Actor[]> {
    return this.http.get<Actor[]>(baseUrl);
  }
  
  getOne(id: any): Observable<Actor> {
    return this.http.get<Actor>(`${baseUrl}/${id}`);
  }

  addActor(data: any): Observable<any> {
    return this.http.post(`${baseUrl}`, data);
  }

  updateActor(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteActor(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  
}
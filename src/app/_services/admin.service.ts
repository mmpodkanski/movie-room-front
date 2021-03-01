import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8080/admin/board';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/users`);
  }

  getAllMoviesRequests(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${baseUrl}/requests`);
  }


  toggleUserStatus(id: any): Observable<any> {
    return this.http.patch(`${baseUrl}/users?id=${id}`, id);
  }


  acceptMovieRequest(id: any): Observable<any> {
    return this.http.patch(`${baseUrl}/requests/${id}/accept`, id);
  }



}

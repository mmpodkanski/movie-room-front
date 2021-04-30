import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

const baseUrl = 'http://localhost:8080/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUserFavourites(id: any): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${baseUrl}/${id}/favourites`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { environment } from 'environment.prod';

const baseUrl = environment.baseUrl + 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUserFavourites(id: any): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${baseUrl}/${id}/favourites`);
  }
}

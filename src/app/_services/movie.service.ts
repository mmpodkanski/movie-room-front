import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { environment } from 'src/environments/environment.prod';

const baseUrl = environment.baseUrl + 'movies';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(baseUrl);
  }
  
  getAllTopRated(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${baseUrl}?top-rated`);
  }
  
  getAllNewest(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${baseUrl}?new-added`);
  }

  get(id: any): Observable<Movie> {
    return this.http.get<Movie>(`${baseUrl}/${id}`);
  }
  
  createMovie(data: any): Observable<any> {
    return this.http.post(`${baseUrl}`, data);
  }

  updateMovie(id:any, data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}`, data);
  }

  deleteMovieById(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  
  createComment(id:any, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/${id}/comments`, data);
  }
  
  checkFavourite(id:any): Observable<boolean> {
    return this.http.get<boolean>(`${baseUrl}/check-fav/${id}`);
  }

  addToFavourites(id:any): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}?add-fav`, null);
  }
  
  removeFromFavourites(id:any): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}?remove-fav`, null);
  }



}

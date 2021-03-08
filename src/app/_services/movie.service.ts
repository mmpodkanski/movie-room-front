import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

const baseUrl = 'http://localhost:8080/movies';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(baseUrl);
  }

  get(id: any): Observable<Movie> {
    return this.http.get<Movie>(`${baseUrl}/${id}`);
  }
  
  createMovie(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/add`, data);
  }

  updateMovie(id:any, data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}/edit`, data);
  }
  
  createComment(id:any, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/${id}/comments/add`, data);
  }
  
  checkFavourite(id:any): Observable<boolean> {
    return this.http.get<boolean>(`${baseUrl}/check-fav/${id}`);
  }

  addToFavourites(id:any): Observable<any> {
    return this.http.post(`${baseUrl}/${id}/add-fav`, null);
  }
  
  removeFromFavourites(id:any): Observable<any> {
    return this.http.post(`${baseUrl}/${id}/remove-fav`, null);
  }
  


  // delete(id: any): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`);
  // }


}

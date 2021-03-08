import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class PublicApiService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<News> {
    return this.http.get(API_URL + 'news')
  }
}

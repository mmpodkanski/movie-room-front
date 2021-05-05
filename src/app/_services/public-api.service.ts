import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';

const baseUrl = environment.baseUrl + 'api';

@Injectable({
  providedIn: 'root'
})
export class PublicApiService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<News> {
    return this.http.get(baseUrl + '/news')
  }
}

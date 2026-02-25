import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  get(path: string) {
    return this.http.get(`${this.baseUrl}${path}`);
  }

  post(path: string, body: any) {
    return this.http.post(`${this.baseUrl}${path}`, body);
  }
}
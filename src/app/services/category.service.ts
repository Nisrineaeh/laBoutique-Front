import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private bddUrl = 'http://localhost:3000/category';

  constructor(private http: HttpClient) { }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.bddUrl, category);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.bddUrl);
  }
}

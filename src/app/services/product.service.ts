import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private bddUrl = 'http://localhost:3000/product';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.bddUrl, {headers: this.getHeaders()});
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.bddUrl, product, { headers: this.getHeaders() });
  }


  getProductsByUser(userId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.bddUrl}/user/${userId}`, { headers: this.getHeaders() });
  }

}

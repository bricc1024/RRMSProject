import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'https://api.jsoning.com/mock/public/products';

  private productsSubject = new BehaviorSubject<Product[] | null>(null);
  public products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[] | null> {
    if (this.productsSubject.value) {
      return this.products$;
    }

    return this.http
      .get<Product[]>(this.url)
      .pipe(tap((products) => this.productsSubject.next(products)));
  }
}

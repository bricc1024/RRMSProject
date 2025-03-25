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

  getProducts(): void {
    if (!this.productsSubject.value) {
      this.http.get<Product[]>(this.url).subscribe((products) => {
        this.productsSubject.next(products);
      });
    }
  }

  getNextId(): string {
    const current = this.productsSubject.value ?? [];
    const lastId =
      current.length > 0 ? Number(current[current.length - 1].id) : 0;
    return (lastId + 1).toString();
  }

  addProduct(product: Product): void {
    const current = this.productsSubject.value ?? [];
    this.productsSubject.next([...current, product]);
  }
}

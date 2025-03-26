import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { Product } from '../model/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly url = 'https://api.jsoning.com/mock/public/products';
  private readonly subject = new BehaviorSubject<Product[] | null>(null);
  public readonly products$ = this.subject.asObservable().pipe(filter(Boolean));

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    if (!this.subject.value) {
      this.http
        .get<Product[]>(this.url)
        .pipe(tap((products) => this.subject.next(products)))
        .subscribe();
    }
    return this.products$;
  }

  getNextId(): string {
    const current = this.subject.value ?? [];
    const ids = current.map((p) => Number(p.id));
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    return (maxId + 1).toString();
  }

  addProduct(product: Product): void {
    const current = this.subject.value ?? [];
    this.subject.next([...current, product]);
  }
}

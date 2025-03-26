import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { Cart } from '../model/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly url = 'https://api.jsoning.com/mock/public/carts';
  private readonly subject = new BehaviorSubject<Cart[] | null>(null);
  public readonly carts$ = this.subject.asObservable().pipe(filter(Boolean));

  constructor(private http: HttpClient) {}

  getCarts(): Observable<Cart[]> {
    if (!this.subject.value) {
      this.http
        .get<Cart[]>(this.url)
        .pipe(tap((carts) => this.subject.next(carts)))
        .subscribe();
    }
    return this.carts$;
  }
}

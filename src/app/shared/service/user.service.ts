import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private url = 'https://api.jsoning.com/mock/public/users';
  private subject = new BehaviorSubject<User[] | null>(null);
  public users$ = this.subject.asObservable().pipe(filter(Boolean));

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    if (!this.subject.value) {
      this.http
        .get<User[]>(this.url)
        .pipe(tap((users) => this.subject.next(users)))
        .subscribe();
    }
    return this.users$;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'https://api.jsoning.com/mock/public/users';

  private usersSubject = new BehaviorSubject<User[] | null>(null);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[] | null> {
    if (this.usersSubject.value) {
      return this.users$;
    }

    return this.http
      .get<User[]>(this.url)
      .pipe(tap((users) => this.usersSubject.next(users)));
  }
}

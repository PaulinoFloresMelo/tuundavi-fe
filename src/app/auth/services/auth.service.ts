import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

type AuthStatus = 'cheking' | 'authenticated' | 'not-authenticated'
const baseUrl = environment.baseUrl; 

@Injectable({providedIn: 'root'})
export class AuthService {
    
    private _authStatus = signal<AuthStatus>('cheking');
    private _user = signal<User | null>(null);
    private _token = signal<string | null>(null);
    
    private http = inject(HttpClient);

    authStatus = computed<AuthStatus>(() => {
        if (this._authStatus() === 'cheking' ) return 'cheking';

        if (this._user()) {
            return 'authenticated';
        }

        return 'not-authenticated';
    });

    user = computed(()=> this._user());
    token = computed(this._token);


    login(email: string, password: string):Observable<boolean>{
        return this.http.post<AuthResponse>(`${ baseUrl }/auth/login`, {
            email: email,
            password: password,
        }).pipe(
            tap(resp => {
                this._user.set(resp.user);
                this._authStatus.set('authenticated');
                this._token.set(resp.token);

                localStorage.setItem('token', resp.token);
            }),
            map( ()=> true ),
            catchError((error: any) => {
                this._user.set(null);
                this._token.set(null);
                this._authStatus.set('not-authenticated');

                return of (false)

            })
        )
    }
}
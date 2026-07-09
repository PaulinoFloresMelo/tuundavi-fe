import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, lastValueFrom, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { LoginRequest } from '../interfaces/login-request';
import { LoginResponse } from '../interfaces/login-response';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated'
const baseUrl = environment.baseUrl; 

@Injectable({providedIn: 'root'})
export class AuthService {
    
    private _authStatus = signal<AuthStatus>('checking');
    private _user = signal<User | null>(null);
    private _token = signal<string | null>(localStorage.getItem('token'));
    
    private http = inject(HttpClient);
    private router = inject(Router);
    private queryClient = inject(QueryClient);

    checkStatusResource = rxResource({
        stream: () => this.checkStatus()
    })

    authStatus = computed<AuthStatus>(() => {
        if (this._authStatus() === 'checking' ) return 'checking';

        if (this._user()) {
            return 'authenticated';
        }

        return 'not-authenticated';
    });

    user = computed(()=> this._user());
    token = computed(this._token);
    isAdmin = computed( () => this._user()?.roles.includes('admin') ?? false);
    isAuthenticated = signal(!!this._token());

    login(email: string, password: string):Observable<boolean>{
        return this.http.post<AuthResponse>(`${ baseUrl }/auth/login`, {
            email: email,
            password: password,
        }).pipe(
            map(resp => this.handleAuthSuccess(resp)),
            catchError((error: any) => this.handleAuthError(error) )
        );
    }

    loginMutation = injectMutation(() => ({
        mutationFn: (credentials: LoginRequest) => this.loginRequest(credentials),
        onSuccess: (data) => {
        // 1. Guardar el token
        this.handleAuthSuccess(data);
        // 2. Invalidar la consulta del perfil para que se refresque
        this.queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        },
        onError: (error) => {
        console.error('Login failed', error);
        // this.logout()
        // Manejar error (mostrar mensaje al usuario, etc.)
        },
    }));

    get mutate() {
        return this.loginMutation.mutate;
    }

    userProfileQuery = injectQuery(() => ({
        queryKey: ['userProfile'],
        queryFn: () => this.getProfile(),
        enabled: this.isAuthenticated, // Solo se ejecuta si hay token
    }));

    checkStatus():Observable<boolean> {
        const token = localStorage.getItem('token');
        if ( !token ) {
            this.logout();
            return of(false);
        }

        return this.http.get<AuthResponse>(`${ baseUrl }/auth/check-status`, {
            // headers: {
            //     Authorization: `Bearer ${ token }`,
            // },
        })
        .pipe(
            map(resp => this.handleAuthSuccess(resp)),
            catchError((error: any) => this.handleAuthError(error) )
        )
    }

    logout() {
        this._user.set(null);
        this._token.set(null);
        this._authStatus.set('authenticated')

        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        this.router.navigateByUrl('/');
    }

    private handleAuthSuccess( {token, user }: AuthResponse ){
        this._user.set(user);
        this._authStatus.set('authenticated');
        this._token.set(token);

        console.log({user});        

        localStorage.setItem('token', token);

        return true
    }

    private handleAuthError( error: any){
        this.logout();
        return of(false);
    }

    private async loginRequest(userLike: Partial<User>): Promise<AuthResponse> {

        try {

            const response = await lastValueFrom(
                this.http.post<AuthResponse>(`${baseUrl}/auth/login`,
                    userLike,
                )
            );
            return response

        } catch (error) {
            console.log(error);
            
            const responseError = error as HttpErrorResponse;
            let  message = responseError.error.message;
            if(message = 'Credentials invalid'){
                message = 'Credenciales inválidas'
            }
            throw new Error(message);
        }
    }

    private async getProfile(): Promise<AuthResponse> {
        
        try {
            
            const response = await lastValueFrom(
                this.http.get<AuthResponse>(`${ baseUrl }/auth/check-status`,)
            );
            console.log({check: response});
            
            
            return response;

        } catch (error) {
            console.log(error);
            
            const responseError = error as HttpErrorResponse;
            let  message = responseError.error.message;
            if(message = 'Credentials invalid'){
                message = 'Credenciales inválidas'
            }
            throw new Error(message);;
        }
    }
}
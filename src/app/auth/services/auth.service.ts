import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import type { AuthResponse } from '../interfaces/auth-response.interface';
import type { LoginRequest } from '../interfaces/login-request.interface';

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

    constructor(){
        effect(() => {
            const query = this.userProfileQuery;

             if (query.isSuccess() && query.data()) {
                const data = query.data();
                this._user.set(data.user);
                this._token.set(data.token);
                this._authStatus.set('authenticated');
                localStorage.setItem('token', data.token);
                console.log('Perfil cargado:', data.user);
            }
                
            // Manejo de error (opcional)
            if (query.isError()) {
            console.error('Error al cargar perfil:', query.error());
            this.logout();
            }   
        });
    }

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

    loginMutation = injectMutation(() => ({
        mutationFn: (credentials: LoginRequest) => this.loginRequest(credentials),
        onSuccess: (data) => {
            this.handleAuthSuccess(data);
            this.queryClient.invalidateQueries({ queryKey: ['userProfile'] });
            this.userProfileQuery.refetch();
        }
    }));

    get mutate() {
        return this.loginMutation.mutate;
    }

    userProfileQuery = injectQuery(() => ({
        queryKey: ['userProfile'],
        queryFn: () => this.getProfile(),
        enabled: this.isAuthenticated, // Solo se ejecuta si hay token
    }));


    logout() {
        this._user.set(null);
        this._token.set(null);
        this._authStatus.set('not-authenticated')

        localStorage.removeItem('token');
        localStorage.removeItem('refresh');

        // this.queryClient.setQueryData(['userProfile'], undefined);
        this.queryClient.setQueryData(['userProfile'], null);
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
    // checkStatusResource = rxResource({
    //     stream: () => this.checkStatus()
    // })

    // login(email: string, password: string):Observable<boolean>{
    //     return this.http.post<AuthResponse>(`${ baseUrl }/auth/login`, {
    //         email: email,
    //         password: password,
    //     }).pipe(
    //         map(resp => this.handleAuthSuccess(resp)),
    //         catchError((error: any) => this.handleAuthError(error) )
    //     );
    // }

    // checkStatus():Observable<boolean> {
    //     const token = localStorage.getItem('token');
    //     if ( !token ) {
    //         this.logout();
    //         return of(false);
    //     }

    //     return this.http.get<AuthResponse>(`${ baseUrl }/auth/check-status`, {
    //         // headers: {
    //         //     Authorization: `Bearer ${ token }`,
    //         // },
    //     })
    //     .pipe(
    //         map(resp => this.handleAuthSuccess(resp)),
    //         catchError((error: any) => this.handleAuthError(error) )
    //     )
    // }
    
    // private handleAuthError( error: any){
    //     this.logout();
    //     return of(false);
    // }

}
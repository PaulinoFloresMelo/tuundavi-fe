import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { User } from '../interfaces/user.interface';
import type { LoginRequest } from '../interfaces/login-request';
import { LoginResponse } from '../interfaces/login-response';
import { Router } from '@angular/router';

const baseUrl = environment.baseUrl


@Injectable({providedIn: 'root'})
export class LoginService {

    private http = inject(HttpClient);
    private router = inject(Router);

    private async login(userLike: Partial<User>): Promise<LoginResponse> {

        try {

            const response = await lastValueFrom(
                this.http.post<LoginResponse>(`${baseUrl}/auth/login`,
                    userLike,
                )
            );
            return response

        } catch (error) {
            console.log(error);
            
            const responseError = error as HttpErrorResponse;
            const message = responseError.error.message;
            throw new Error(message);
        }
        
    }
    
    private  mutation = injectMutation(() => ({
        mutationFn: (user: LoginRequest) => this.login(user),
        onSuccess: (data) => {
            // this.queryClient.invalidateQueries({ queryKey: ['userAuthenticated'] }),
             localStorage.setItem('token', data.token);
        },
        onError:() => {
            localStorage.removeItem('token')
            localStorage.removeItem('refresh')
            this.router.navigateByUrl('/'); 
        }
    }))

    get mutate() {
        return this.mutation.mutate;
    }
}

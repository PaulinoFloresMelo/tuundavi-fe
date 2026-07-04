import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';

import { environment } from 'src/environments/environment.development';
import type  { Term } from 'src/app/terms/interfaces/term.interface'

const baseUrl = environment.baseUrl


@Injectable({providedIn: 'root'})
export class CreateTermService {

    private http = inject(HttpClient);
    private queryClient = inject(QueryClient);

    private async createTerm(term: Partial<Term>): Promise<Partial<Term>> {

        try {

            const response = await lastValueFrom(
                this.http.post<Partial<Term>>(`${baseUrl}/terms/term-register`,
                    term,
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
        mutationFn: (term: Partial<Term>) => this.createTerm(term),
        onSuccess: () => {
            this.queryClient.invalidateQueries({ queryKey: ['terms'] })
        }
    }))

    get mutate() {
        return this.mutation.mutate;
    }
}

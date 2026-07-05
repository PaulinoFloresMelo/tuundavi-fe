import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';

import { environment } from 'src/environments/environment';
import type  { Term } from 'src/app/terms/interfaces/term.interface'

const baseUrl = environment.baseUrl


@Injectable({providedIn: 'root'})
export class UploadImageService {

    private http = inject(HttpClient);
    private queryClient = inject(QueryClient);

    private async uploadImages(imageFile: File): Promise<Partial<Term>> {

        try {

            const response = await lastValueFrom(
                this.http.post<Partial<Term>>(`${baseUrl}/images/upload`,
                    imageFile,
                )
            );
            console.log({responseOfUploadImage: response});
            return response

        } catch (error) {
            console.log(error);
            
            const responseError = error as HttpErrorResponse;
            const message = responseError.error.message;
            throw new Error(message);
        }
        
    }
    
    private  mutation = injectMutation(() => ({
        mutationFn: (imageFile: File) => this.uploadImages(imageFile),
        onSuccess: () => {
            this.queryClient.invalidateQueries({ queryKey: ['images'] })
        }
    }))

    get mutate() {
        return this.mutation.mutate;
    }
}

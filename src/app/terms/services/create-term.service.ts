import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';

import { environment } from 'src/environments/environment';
import type { Term } from 'src/app/terms/interfaces/term.interface'
import type { CreateTermRequest } from '../interfaces/create-term-request.interface';
import type { UploadImageResponse } from '../interfaces/upload-image-response.interface';

const baseUrl = environment.baseUrl


@Injectable({providedIn: 'root'})
export class CreateTermService {

    private http = inject(HttpClient);
    private queryClient = inject(QueryClient);

    private async createTerm(request: CreateTermRequest): Promise<Partial<Term>> {
        const termLike = request.term;
        const image = request.imageFile;
        const audio = request.audioFile

        termLike.userId = request.userId;

        if(image !== undefined){
                        
            const formData = new FormData();
            formData.append('image', image[0]);
            
            try {
                const responseImageUpload = await lastValueFrom(
                    this.http.post<Partial<UploadImageResponse>>(`${baseUrl}/images/upload`, 
                        formData, 
                    )
                )
                termLike.imageUrl = responseImageUpload.fileName
                // console.log({responseImageUpload});
                
            } catch (error) {
                console.log({responseImageUpload: error});
                
                const responseError = error as HttpErrorResponse;
                const message = responseError.error.message;
                throw new Error(message);
            }
        }

        if(audio !== null){
            
            const formData = new FormData();
            formData.append('audio', audio);
            
            try {
                const responseAudioUpload = await lastValueFrom(
                    this.http.post<Partial<UploadImageResponse>>(`${baseUrl}/audio/upload`, 
                        formData, 
                    )
                )
                termLike.audioUrl = responseAudioUpload.fileName
                // console.log({responseAudioUpload});
                
            } catch (error) {
                console.log({responseImageUpload: error});
                
                const responseError = error as HttpErrorResponse;
                const message = responseError.error.message;
                throw new Error(message);
            }
        }

        try {

            const response = await lastValueFrom(
                this.http.post<Partial<Term>>(`${baseUrl}/terms`,
                    termLike,
                )
            );
            console.log(response);
            
            return response

        } catch (error) {
            console.log(error);
            
            const responseError = error as HttpErrorResponse;
            const message = responseError.error.message;
            throw new Error(message);
        }
        
    }
    
    private  mutation = injectMutation(() => ({
        mutationFn: (resquest: CreateTermRequest) => this.createTerm(resquest),
        onSuccess: () => {
            this.queryClient.invalidateQueries({ queryKey: ['terms'] })
        }
    }))

    get mutate() {
        return this.mutation.mutate;
    }

    get isPending() {
        return this.mutation.isPending;
    }

}

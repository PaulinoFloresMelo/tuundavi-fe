import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';

import { environment } from 'src/environments/environment';
import type { Term } from '../interfaces/term.interface';
import { UpdateTermRequest } from '../interfaces/update-term-request.interface';
import { UploadImageResponse } from '../interfaces/upload-image-response.interface';

const baseUrl = environment.baseUrl


@Injectable({providedIn: 'root'})
export class UpdateTermService {

    private http = inject(HttpClient)
    private queryClient = inject(QueryClient)


    private async updateTerm(request: UpdateTermRequest): Promise<Partial<Term>> {
        const id=  request.id;
        const termLike = request.term;
        const image = request.imageFile
        
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
                console.log({responseImageUpload});
                
            } catch (error) {
                console.log({responseImageUpload: error});
                
                const responseError = error as HttpErrorResponse;
                const message = responseError.error.message;
                throw new Error(message);
            }
        }
        
        try {

            const response = await lastValueFrom(
                this.http.patch<Partial<Term>>(`${baseUrl}/terms/${id}`, 
                    termLike, 
                )
            )    
            return response

        } catch (error) {
            console.log(error);
            
            const responseError = error as HttpErrorResponse;
            const message = responseError.error.message;
            throw new Error(message);
        }
    }
        
    private  mutation = injectMutation(() => ({
        mutationFn: (resquest: UpdateTermRequest) => this.updateTerm(resquest),
        onSuccess: (data, variables) => {
            this.queryClient.invalidateQueries({ queryKey: ['terms'] });
            this.queryClient.invalidateQueries({ queryKey: ['term', variables.id.toString()] });
        }
    }))

    get mutate() {
        return this.mutation.mutate;
    }
}

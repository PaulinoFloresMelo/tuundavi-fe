import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';

import { environment } from 'src/environments/environment';
import type  { Term } from 'src/app/terms/interfaces/term.interface'

const baseUrl = environment.baseUrl


@Injectable({providedIn: 'root'})
export class UploadAudioService {

    private http = inject(HttpClient);
    private queryClient = inject(QueryClient);

    private async uploadAudio(audioFile: File): Promise<Partial<Term>> {

        try {

            const response = await lastValueFrom(
                this.http.post<Partial<Term>>(`${baseUrl}/audio/upload`,
                    audioFile,
                )
            );
            console.log({responseOfUploadAudio: response});
            return response

        } catch (error) {
            console.log(error);
            
            const responseError = error as HttpErrorResponse;
            const message = responseError.error.message;
            throw new Error(message);
        }
        
    }
    
    private  mutation = injectMutation(() => ({
        mutationFn: (audioFile: File) => this.uploadAudio(audioFile),
        onSuccess: () => {
            this.queryClient.invalidateQueries({ queryKey: ['audios'] })
        }
    }))

    get mutate() {
        return this.mutation.mutate;
    }
}

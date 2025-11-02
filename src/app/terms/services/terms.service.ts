import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Term, TermsResponse } from '../interfaces/term.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options{
    limit?: number;
    offset?: number;
    category?: string;
}


@Injectable({providedIn: 'root'})
export class TermsService {
    
    private http = inject(HttpClient)
    getTerms( options: Options ):Observable<TermsResponse>{

        const { limit = 2, offset =0 , category = ''} = options

        return this.http
        .get<TermsResponse>(`${baseUrl}/terms`,{
            params:{
                limit, 
                offset, 
                category 
            }
        })
        .pipe(tap((resp) => console.log(resp)));
    }

    getTermById(idSlug: string): Observable<Term>{
        return this.http.get<Term>(`${baseUrl}/terms/${idSlug}`,)
        .pipe(tap((resp) => console.log(resp)));
    }
}
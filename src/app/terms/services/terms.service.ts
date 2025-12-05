import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Term, TermsResponse } from '../interfaces/term.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options{
    limit?: number;
    offset?: number;
    category?: string;
}


@Injectable({providedIn: 'root'})
export class TermsService {
    
    private http = inject(HttpClient);
    private termsCache = new Map<string,TermsResponse>();
    private termCache = new Map<string,Term>();

    getTerms( options: Options ):Observable<TermsResponse>{

        const { limit = 2, offset =0 , category = ''} = options;
        
        const key = `${limit}-${offset}-${category}`; // 9-0-''
        if ( this.termsCache.has(key) ) {
            return of(this.termsCache.get(key)!);
        }

        return this.http
        .get<TermsResponse>(`${baseUrl}/terms`,{
            params:{
                limit, 
                offset, 
                category 
            }
        })
        .pipe(
            tap((resp) => console.log(resp)),
            tap((resp) => this.termsCache.set(key, resp))
        );
    }

    getTermById(id: string): Observable<Term>{
        if (this.termCache.has(id)) {
            return of(this.termCache.get(id)!);
        }

        return this.http
            .get<Term>(`${baseUrl}/terms/${id}`)
            .pipe(tap((term) => this.termCache.set(id, term))
        );
    }
}
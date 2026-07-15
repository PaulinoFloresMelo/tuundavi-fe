import { inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { queryOptions } from "@tanstack/angular-query-experimental"
import { lastValueFrom } from "rxjs";

import { environment } from "src/environments/environment";
import type { TermsResponse } from "../interfaces/term.interface";

const baseUrl = environment.baseUrl;

interface Options{
    limit?: number;
    offset?: number;
    category?: string;
    page?: number;
}
    
@Injectable({providedIn: 'root'})
export class GetTermsService {

    private http = inject(HttpClient);
    private options = {
            limit : 1, offset : 0, category: ''
        }

    private async getTerms(category: string, page: number): Promise<TermsResponse> {
        

        try {
            
            const response = await lastValueFrom(
                this.http.get<TermsResponse>(`${baseUrl}/terms`,{
                    params:{
                    limit : this.options.limit,
                    offset: this.options.limit * (page-1),
                    category: category
                }
                })
            )
            console.log(response);
            
            return response;

        } catch (error) {
            console.log(error);
            throw new Error('No se pudieron obtener los Terminos');
        }
    }

    termsQuery(category: string, page: number) {

        const termssQuery = queryOptions({    
            queryKey: ['terms', category, page.toString()],
            queryFn: () => this.getTerms(category, page),
            staleTime: 5 * 60 * 1000
        })
        return termssQuery
    }
}

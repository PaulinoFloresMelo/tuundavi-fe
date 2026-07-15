import { inject, Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"

import { queryOptions } from "@tanstack/angular-query-experimental"
import { lastValueFrom } from "rxjs";

import { environment } from "src/environments/environment";
import type { TermsResponse } from "../interfaces/term.interface";

const baseUrl = environment.baseUrl;

    
@Injectable({providedIn: 'root'})
export class SearchTermService {

    private http = inject(HttpClient) ;

    private async searchTerm(query: string): Promise<TermsResponse> {

        try {
            
            const response = await lastValueFrom(
                this.http.get<TermsResponse>(`${baseUrl}/terms/search?q=${query}`))
            console.log(response);
            
            return response;

        } catch (error) {
            const errorResponse = error as HttpErrorResponse;
            const message = errorResponse.error.message
            
            throw new Error(message);
        }
    }

    searchTermQuery(query: string) {
        const usersQuery = queryOptions({    
            queryKey: ['terms', query],
            queryFn: () => this.searchTerm(query),
            staleTime: 5 * 60 * 1000,
            enabled: !!query,
            retry: 0
        })
        return usersQuery
    }
}
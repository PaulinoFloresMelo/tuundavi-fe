import { inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { injectQuery, queryOptions } from "@tanstack/angular-query-experimental"
import { lastValueFrom } from "rxjs";

import { environment } from "src/environments/environment";
import type { Term, TermsResponse } from "../interfaces/term.interface";
import { TermResponse } from "../interfaces/term-response";

const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class GetTermService {

    private http = inject(HttpClient);

    private async getTerms(id: string): Promise<TermResponse> {

        try {
            
            const response = await lastValueFrom(
                this.http.get<TermResponse>(`${baseUrl}/terms/${id}`,)
            )
            console.log(response);
            
            return response;

        } catch (error) {
            throw new Error('No se pudieron obtener los Terminos');
        }
    }

    public termQuery = (id: string) => injectQuery(() => ({
        queryKey: ['term', id],
        queryFn: () => this.getTerms(id),
        staleTime: 5 * 60 * 1000,
    }));
}

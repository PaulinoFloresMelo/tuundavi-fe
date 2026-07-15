import { inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { injectQuery, queryOptions } from "@tanstack/angular-query-experimental"
import { lastValueFrom } from "rxjs";

import { environment } from "src/environments/environment";
import { VariantResponse } from "../interfaces/variants.response.interface";

const baseUrl = environment.baseUrl;

    
@Injectable({providedIn: 'root'})
export class GetVariantsService {

    private http = inject(HttpClient) ;

    private async getVariants(): Promise<VariantResponse> {

        try {
            
            const response = await lastValueFrom(
                this.http.get<VariantResponse>(`${baseUrl}/variants`,{
            }))
            console.log(response);
            
            return response;

        } catch (error) {
            console.log(error);
            throw new Error('No se pudieron obtener las variantes');
        }
    }

    private variantsQuery = injectQuery(() => ({
        queryKey: ['variants'],
        queryFn: () => this.getVariants(),
        staleTime: 5 * 60 * 1000
    }))

    get data() {
        return this.variantsQuery.data;
    }

    get isLoading(){
        return this.variantsQuery.isLoading;
    }
}
import { inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { injectQuery } from "@tanstack/angular-query-experimental"
import { lastValueFrom } from "rxjs";

import { environment } from "src/environments/environment";
import { VariantsNameResponse } from "../interfaces/variantsName-response.interface";

const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class GetVariantsNameService {

    private http = inject(HttpClient);

    private async getVariantsName(): Promise<VariantsNameResponse> {

        try {
            
            const response = await lastValueFrom(
                this.http.get<VariantsNameResponse>(`${baseUrl}/variantsName`,)
            )
            console.log(response);
            
            return response;

        } catch (error) {
            throw new Error('No se pudieron obtener los Nombres de las variantes');
        }
    }

    public variantsNameQuery = injectQuery(() => ({
        queryKey: ['variantsName'],
        queryFn: () => this.getVariantsName(),
        staleTime: 5 * 60 * 1000,
    }));

    get data() {
        return this.variantsNameQuery.data;
    }
}

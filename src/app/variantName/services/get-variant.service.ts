import { inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { queryOptions } from "@tanstack/angular-query-experimental"
import { lastValueFrom } from "rxjs";

import { environment } from "src/environments/environment";
import { StatesByVariantsId } from "../interfaces/states-by-variants-id-response.interface";

const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class GetVariantService {

    private http = inject(HttpClient);

    private async getVariant(id: string): Promise<StatesByVariantsId> {

        try {
            
            const response = await lastValueFrom(
                this.http.get<StatesByVariantsId>(`${baseUrl}/variants/${id}`,)
            )
            console.log(response);
            
            return response;

        } catch (error) {
            throw new Error('No se pudieron obtener los Nombres de las variantes');
        }
    }

    variantQuery(id: string) {

        const variantQuery = queryOptions({    
            queryKey: ['variant', id],
            queryFn: () => this.getVariant(id),
            staleTime: 5 * 60 * 1000
        })
        return variantQuery
    }
}

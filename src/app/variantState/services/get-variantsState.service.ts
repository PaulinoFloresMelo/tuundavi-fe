import { inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { injectQuery } from "@tanstack/angular-query-experimental"
import { lastValueFrom } from "rxjs";

import { environment } from "src/environments/environment";
import { VariantsStateResponse } from "../interfaces/variantsState-response.interface";

const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class GetVariantsStateService {

    private http = inject(HttpClient);

    private async getVariantsState(): Promise<VariantsStateResponse> {

        try {
            
            const response = await lastValueFrom(
                this.http.get<VariantsStateResponse>(`${baseUrl}/variantsState`,)
            )
            console.log(response);
            
            return response;

        } catch (error) {
            throw new Error('No se pudieron obtener los estados');
        }
    }

    public variantsStateQuery = injectQuery(() => ({
        queryKey: ['variantsState'],
        queryFn: () => this.getVariantsState(),
        staleTime: 5 * 60 * 1000,
    }));

    get data() {
        return this.variantsStateQuery.data;
    }
}

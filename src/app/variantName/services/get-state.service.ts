import { inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { queryOptions } from "@tanstack/angular-query-experimental"
import { lastValueFrom } from "rxjs";

import { environment } from "src/environments/environment";
import { StatesByVariantsId } from "../interfaces/states-by-variants-id-response.interface";
import { MunicipalitiesByStateId } from "../interfaces/municipalities-by-state-id-response.interface";

const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class GetStateService {

    private http = inject(HttpClient);

    private async getState(params: {id: string, variantId: string}): Promise<MunicipalitiesByStateId> {
        if(params.id === ''){
            return {
                id: 0,
                name: '',
                municipalities: []
            }
        }
        try {
            
            const response = await lastValueFrom(
                this.http.get<MunicipalitiesByStateId>(`${baseUrl}/states/${params.id}`,{
                    params:{
                        variantId: params.variantId
                    }
                })
            )
            console.log(response);
            
            return response;

        } catch (error) {
            throw new Error('No se pudo obtener el estado con sus municipios');
        }
    }

    stateQuery(params: {id: string, variantId: string}) {

        const stateQuery = queryOptions({    
            queryKey: ['state', params.id],
            queryFn: () => this.getState(params),
            staleTime: 5 * 60 * 1000
        })
        return stateQuery
    }
}

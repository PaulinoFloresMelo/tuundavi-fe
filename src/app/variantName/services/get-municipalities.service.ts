import { inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { queryOptions } from "@tanstack/angular-query-experimental"
import { lastValueFrom } from "rxjs";

import { environment } from "src/environments/environment";
import { LocalitiesByMunicipalityId } from "../interfaces/localities-by-mucipality-id-response.interface";

const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class GetMunicipalitiesService {

    private http = inject(HttpClient);

    private async getMunicipality( id: string): Promise<LocalitiesByMunicipalityId> {
        if( id === ''){
            return {
                id: 0,
                name: '',
                localities: []
            }
        }
        try {
            
            const response = await lastValueFrom(
                this.http.get<LocalitiesByMunicipalityId>(`${baseUrl}/municipalities/${id}`)
            )
            console.log(response);
            
            return response;

        } catch (error) {
            throw new Error('No se pudo obtener el estado con sus municipios');
        }
    }

    MunicipalitQuery(id: string) {

        const MunicipalitQuery = queryOptions({    
            queryKey: ['mucipality', id],
            queryFn: () => this.getMunicipality( id ),
            staleTime: 5 * 60 * 1000
        })
        return MunicipalitQuery
    }
}

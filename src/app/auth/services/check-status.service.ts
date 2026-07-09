// import { inject, Injectable } from "@angular/core"
// import { HttpClient } from "@angular/common/http"

// import { lastValueFrom } from "rxjs";
// import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';

// import { environment } from "src/environments/environment";
// import type { Subarea } from "@subarea/interfaces/subarea.interface";
// import type { SubareaResponse } from "@subarea/interfaces/subarea-response.interface";
// import type { SubareasResponse } from "@subarea/interfaces/subareas.response.interface";
// import { Router } from "@angular/router";

// const baseUrl = environment.baseUrl;

// const emptySubarea: Subarea = {
//     id: 'new',
//     name: '',
//     description: '',
//     area: 0,
//     parent: 0,
//     is_active: false
// }

    
// @Injectable({providedIn: 'root'})
// export class GetSubareaService {

//     private http        = inject(HttpClient);
//     private router = inject(Router);

    
//     private async getSubarea(id: string): Promise<Subarea> {

//         if (id === 'new'){
//             return emptySubarea;
//         }
        
//         try {
            
//             const response = await lastValueFrom(
//                 this.http.get<SubareaResponse>(`${baseUrl}/subareas/${id}`,)
//             );
            
//             return response.data;

//         } catch (error) {
//             console.log(error);
//             throw new Error('No se pudo obtener la subarea');
//         }
//     }

//     public subareaQuery = (id: string) => injectQuery(() => ({
//         queryKey: ['subarea', id],
//         queryFn: () => this.getSubarea(id),
//         staleTime: 5 * 60 * 1000,
//     }));
// }
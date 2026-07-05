import { inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';

const baseUrl = environment.baseUrl; 

@Injectable({providedIn: 'root'})
export class RegisterService {
       
    private http = inject(HttpClient);

    register(email: string, password: string, firstName: string, maternalSurname: string, paternalSurname: string){
        return this.http.post<AuthResponse>(`${ baseUrl }/auth/register`, {
            email: email,
            password: password,
            firstName: firstName, 
            maternalName: maternalSurname, 
            paternalName: paternalSurname  
        })
    }
}
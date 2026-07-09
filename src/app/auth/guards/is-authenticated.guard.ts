import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const IsAuthenticatedGuard: CanMatchFn = async(
    route: Route,
    segments: UrlSegment[]
) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    const isAuthenticated = await firstValueFrom(authService.checkStatus());
    console.log({isAuthenticated});
    
    // if(isAuthenticated){
    //     return true;

    // }
    // return false

    if ( !isAuthenticated ) {
        router.navigateByUrl('/')
        return false;
    }

    return true;
}
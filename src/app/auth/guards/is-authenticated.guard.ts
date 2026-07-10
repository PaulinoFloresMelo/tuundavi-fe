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

    const user = authService.userProfileQuery.data

    // const isAuthenticated = await firstValueFrom(authService.checkStatus());
    // console.log({isAuthenticated});
    
    // if(isAuthenticated){
    //     return true;

    // }
    // return false

    if ( !user()?.user ) {
        console.log(user()?.user);

        router.navigateByUrl('/')
        return false;
    }else{
        console.log(user()?.user);
        
    }

    return true;
}
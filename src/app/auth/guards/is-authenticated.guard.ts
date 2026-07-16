import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const IsAuthenticatedGuard: CanMatchFn = async(
    route: Route,
    segments: UrlSegment[]
) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.userProfileQuery.data

    if ( !user()?.user ) {

        router.navigateByUrl('/')
        return false;
    }

    return true;
}
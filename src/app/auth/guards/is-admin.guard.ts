import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const IsAdminGuard: CanMatchFn = async(
    route: Route,
    segments: UrlSegment[]
) => {
    const authService = inject(AuthService);
    const user = authService.userProfileQuery.data
    
    return !authService.isAdmin();
}
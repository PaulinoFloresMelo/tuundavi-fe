import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '@/auth/interfaces/user.interface';

export const IsAdminGuard: CanMatchFn = async(
    route: Route,
    segments: UrlSegment[]
) => {
    const authService = inject(AuthService);
    const user = authService.userProfileQuery.data
    // await firstValueFrom( authService.checkStatus() );
    
    return !authService.isAdmin();
}
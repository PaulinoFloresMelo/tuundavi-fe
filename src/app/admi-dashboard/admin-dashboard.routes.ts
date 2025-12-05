import { Routes } from "@angular/router";
import { TermAdminPage } from "./pages/term-admin-page/term-admin-page";
import { Component } from '@angular/core';
import { AdminDashboardLayout } from "./layouts/admin-dashboard-layout/admin-dashboard-layout";
import { TermsAdminPage } from "./pages/terms-admin-page/terms-admin-page";
import { IsAdminGuard } from "@/auth/guards/is-admin.guard";
import { UserAdminPage } from "./pages/user-admin-page/user-admin-page";
import { UsersAdminPage } from "./pages/users-admin-page/users-admin-page";

export const adminDashboardRoutes: Routes = [
    {
        path:'',
        component: AdminDashboardLayout,
        canMatch: [
            IsAdminGuard
        ],
        children: [
            {
                path: 'terms',
                component: TermsAdminPage
            },
            {
                path: 'term/:id',
                component: TermAdminPage
            },
            {
                path: 'users',
                component: UsersAdminPage
            },
            {
                path: 'user/:id',
                component: UserAdminPage
            },
            {
                path: '**',
                redirectTo: 'terms'
            }
        ]
    },

];

export default adminDashboardRoutes;
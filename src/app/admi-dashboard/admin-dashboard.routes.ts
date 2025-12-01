import { Routes } from "@angular/router";
import { TermAdminPage } from "./pages/term-admin-page/term-admin-page";
import { Component } from '@angular/core';
import { AdminDashboardLayout } from "./layouts/admin-dashboard-layout/admin-dashboard-layout";
import { TermsAdminPage } from "./pages/terms-admin-page/terms-admin-page";

export const adminDashboardRoutes: Routes = [
    {
        path:'',
        component: AdminDashboardLayout,
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
                path: '**',
                redirectTo: 'terms'
            }
        ]
    },

];

export default adminDashboardRoutes;
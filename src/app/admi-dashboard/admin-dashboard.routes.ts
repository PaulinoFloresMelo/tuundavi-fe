import { Routes } from "@angular/router";
import { TermAdminPage } from "./pages/term-admin-page/term-admin-page";
import { Component } from '@angular/core';
import { AdminDashboardLayout } from "./layouts/admin-dashboard-layout/admin-dashboard-layout";

export const adminDashboardRoutes: Routes = [
    {
        path:'',
        component: AdminDashboardLayout,
        children: [
            {
                path: 'terms',
                component: TermAdminPage
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
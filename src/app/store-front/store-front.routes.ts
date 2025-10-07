import { Routes } from "@angular/router";
import { StoreFrontLayoutComponent } from "./layouts/store-front-layout/store-front-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { TermPageComponent } from "./pages/term-page/term-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

export const storeFrontRoutes: Routes = [
    {
        path: '',
        component: StoreFrontLayoutComponent,
        children: [
            {
                path: '',
                component: HomePageComponent,
            },
            {
                path: 'term/id:Slug',
                component: TermPageComponent,
            },
            {
                path: '**',
                component: NotFoundPageComponent,
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    }
]

export default storeFrontRoutes
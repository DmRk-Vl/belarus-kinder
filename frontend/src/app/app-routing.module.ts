import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import {ArticleEditorComponent} from "./article-editor/article-editor.component";
import {AuthGuardService} from "./user/auth-guard.service";
import {NewsComponent} from "./news/news.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {WidgetsComponent} from "./widgets/widgets.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: 'analytics',
        component: AnalyticsComponent,
    },
    {
        path: 'news',
        component: NewsComponent,
    },
    {
        path: 'widgets',
        component: WidgetsComponent,
    },
    {
        path: 'article-editor',
        component: ArticleEditorComponent,
        // canActivate: [AuthGuardService]
    },
    {
        path: 'article-editor/:id',
        component: ArticleEditorComponent,
        // canActivate: [AuthGuardService]
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: '**',
        redirectTo: '/home',
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

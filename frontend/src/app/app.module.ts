import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { MenuComponent } from "./menu/menu.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { ActionsComponent } from "./actions/actions.component";
import {ArticleEditorModule} from './article-editor/article-editor.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserModule} from "./user/user.module";
import {NotifierModule} from 'angular-notifier';
import {NewsModule} from "./news/news.module";
import {WidgetsComponent} from "./widgets/widgets.component";
import {WidgetComponent} from "./widgets/widget/widget.component";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        HomeComponent,
        WidgetsComponent,
        WidgetComponent,
        AboutComponent,
        AnalyticsComponent,
        ActionsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MenubarModule,
        MenuModule,
        ArticleEditorModule,
        ReactiveFormsModule,
        DialogModule,
        BrowserAnimationsModule,
        UserModule,
        NotifierModule,
        NewsModule,
        ArticleEditorModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}

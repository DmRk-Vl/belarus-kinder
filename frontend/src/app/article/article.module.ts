import { NgModule } from '@angular/core';
import {ArticleComponent} from "./article.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ArticleService} from "./article.service";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        ArticleComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    exports: [
        ArticleComponent,
    ],
    providers: [
        ArticleService,
    ],
})
export class ArticleModule {
}

import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {ArticleEditorComponent} from "./article-editor.component";
import {ArticleEditorService} from "./article-editor.service";
import {ImageUploadModule} from "../image-upload/image-upload.module";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {EditorModule as PrimeEditorModule} from 'primeng/editor';
import {ArticleModule} from "../article/article.module";
import {NotifierModule} from "angular-notifier";
import {DropdownModule} from "primeng";
import {EditorModule} from "../shared/editor/editor.module";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        ArticleEditorComponent,
    ],
    imports: [
        HttpClientModule,
        ImageUploadModule,
        FormsModule,
        InputTextModule,
        PrimeEditorModule,
        ArticleModule,
        NotifierModule,
        DropdownModule,
        EditorModule,
        CommonModule,
    ],
    providers: [
        ArticleEditorService,
    ],
    exports: [
        ArticleEditorComponent,
    ]
})
export class ArticleEditorModule {
}

import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {EditorComponent} from "./editor.component";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {EditorModule as PrimeEditorModule} from 'primeng/editor';
import {NotifierModule} from "angular-notifier";
import {DropdownModule} from "primeng";

@NgModule({
    declarations: [
        EditorComponent,
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        InputTextModule,
        PrimeEditorModule,
        NotifierModule,
        DropdownModule,
    ],
    exports: [
        EditorComponent,
    ]
})
export class EditorModule {
}

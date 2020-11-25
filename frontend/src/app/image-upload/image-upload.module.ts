import { NgModule } from '@angular/core';
import {ImageUploadComponent} from "./image-upload.component";
import {ImageUploadService} from "./image-upload.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        ImageUploadComponent,
    ],
    imports: [
        HttpClientModule,
        CommonModule,
    ],
    providers: [
        ImageUploadService,
    ],
    exports: [
        ImageUploadComponent
    ]
})
export class ImageUploadModule {
}

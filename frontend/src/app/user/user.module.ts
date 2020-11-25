import { NgModule } from '@angular/core';
import {AuthGuardService} from "./auth-guard.service";
import {AuthService} from "./auth.service";
import {ProfileComponent} from "./profile/profile.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MessageComponent} from "./message/message.component";
import {NotifierModule} from "angular-notifier";

@NgModule({
    declarations: [
        ProfileComponent,
        MessageComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        NotifierModule
    ],
    providers: [
        AuthService,
        AuthGuardService,
    ],
    exports: [
        ProfileComponent,
        MessageComponent,
    ]
})
export class UserModule {
}

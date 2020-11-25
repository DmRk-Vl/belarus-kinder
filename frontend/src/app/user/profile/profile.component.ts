import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {NotifierService} from "angular-notifier";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit{
    profileForm: FormGroup;

    visibleMessageForm: boolean = false;

    constructor(
        public authService: AuthService,
        private notifier: NotifierService,
    ) {}

    ngOnInit() {
        this.profileForm = new FormGroup({
            "currentPassword": new FormControl("", Validators.required),
            "newPassword": new FormControl("", Validators.required),
            "confirmPassword": new FormControl("", Validators.required),
        });
    }

    async update(): Promise<void> {
        try {
            // await this.authService.update(this.profileForm.value.email, this.profileForm.value.password, this.profileForm.value.confirmPassword)
            this.notifier.show({
                type: 'success',
                message: 'Password has been updated',
            });
        } catch (e) {
            this.notifier.show({
                type: 'error',
                message: 'Something goes wrong. Please, check your email or password you\'ve entered. Failed to login',
            });
        }
    }

    showMessageForm(): void {
        this.visibleMessageForm = true;
    }
}

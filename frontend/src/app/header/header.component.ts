import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, Router } from "@angular/router";
import {Subject} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../user/auth.service";
import { NotifierService } from 'angular-notifier';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy{
    items: MenuItem[];

    isHomePage: boolean = true;

    showLoginPopup: boolean = false;

    showRegistrationPopup: boolean = false;

    isAuthenticated: boolean = false;

    loginForm: FormGroup;
    registrationForm: FormGroup;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private authService: AuthService,
        private router: Router,
        private notifier: NotifierService,
        private readonly fb: FormBuilder,
    ) {}

    ngOnInit() {
        this.isAuthenticated = this.authService.isAuthenticated()

        this.items = [
            {
                label: 'Home',
                routerLink: ['/home'],
            },
            {
                label: 'News',
                routerLink: ['/news'],
            },
            {
                label: 'About',
                routerLink: ['/about'],
            },
            {
                label: 'widgets',
                routerLink: ['/widgets'],
            },
        ];

        if (this.authService.isAdmin()) {
            this.items = this.items.concat([
                {
                    label: 'Editor',
                    routerLink: ['/article-editor'],
                },
                {
                    label: 'Analytics',
                    routerLink: ['/analytics'],
                },
            ]);
        }

        if (this.isAuthenticated) {
            this.items = this.items.concat([
                {
                    label: 'Profile',
                    routerLink: ['/profile'],
                },
            ]);
        }

        this.router.events
            .subscribe((event: NavigationEnd) => {
                this.isHomePage = this.router.url === '/home';
            });


        this.loginForm = new FormGroup({
            "email": new FormControl("", [Validators.required, Validators.email]),
            "password": new FormControl("", Validators.required),
        });

        this.registrationForm = new FormGroup({
            "firstName": new FormControl("", Validators.required),
            "lastName": new FormControl("", Validators.required),
            "email": new FormControl("", [Validators.required, Validators.email]),
            "password": new FormControl("", Validators.required),
        });
    }

    openLoginPage() {
        this.showRegistrationPopup = false;
        this.showLoginPopup = true;
    }

    openRegistrationPage() {
        this.showLoginPopup = false;
        this.showRegistrationPopup = true;
    }

    async login(): Promise<void> {
        try {
            await this.authService.login(this.loginForm.value.email, this.loginForm.value.password)

            this.showLoginPopup = false;

            this.isAuthenticated = this.authService.isAuthenticated()

            this.items = [
                {
                    label: 'Home',
                    routerLink: ['/home'],
                },
                {
                    label: 'News',
                    routerLink: ['/news'],
                },
                {
                    label: 'About',
                    routerLink: ['/about'],
                },
            ];

            if (this.authService.isAdmin()) {
                this.items = this.items.concat([
                    {
                        label: 'Editor',
                        routerLink: ['/article-editor'],
                    },
                    {
                        label: 'Analytics',
                        routerLink: ['/analytics'],
                    },
                ]);
            }

            if (this.isAuthenticated) {
                this.items = this.items.concat([
                    {
                        label: 'Profile',
                        routerLink: ['/profile'],
                    },
                ]);
            }
        } catch (e) {
            this.notifier.show({
                type: 'error',
                message: 'Something goes wrong. Please, check your email or password you\'ve entered. Failed to login',
            });
        }
    }

    async logout(): Promise<void> {
        await this.authService.logout();
        location.assign('/');
    }

    async register(): Promise<void> {
        this.showRegistrationPopup = false;

        const data = this.registrationForm.value;

        await this.authService.register(data.firstName, data.lastName, data.email, data.password)
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}

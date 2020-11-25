import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
    title = 'kinder';

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private router: Router,
    ) {}

    ngOnInit() {
        this.router.events
            .subscribe((event: NavigationEnd) => {
                // this.isEditorPage = this.router.url != '/home';
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}

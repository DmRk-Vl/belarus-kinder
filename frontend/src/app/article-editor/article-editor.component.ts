import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleEditorService} from "./article-editor.service";
import {Article} from "../article/article.component";
import {NotifierService} from "angular-notifier";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
    selector: 'article-editor',
    templateUrl: './article-editor.component.html',
})
export class ArticleEditorComponent implements OnInit, OnDestroy {
    subs: Array<Subscription> = [];

    article: Article = {
        title: '',
        body: '',
        image: '',
    }

    form: FormGroup;

    toolbar: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{'size': [ 'small', false, 'large', 'huge' ]}],
            [{ 'header': 1 }, { 'header': 2 }],
        ]
    }

    options = [
        { label: 'Space', value: 'space' },
        { label: 'Programming', value: 'programming' },
    ];

    selectedGroup: string;

    ready: boolean = false;

    constructor(
        private editorService: ArticleEditorService,
        private notifier: NotifierService,
        private activatedRoute: ActivatedRoute,
        private readonly fb: FormBuilder,
    ) {}

    async ngOnInit(): Promise<void> {
        const id = this.activatedRoute.snapshot.params['id'];

        this.form = this.fb.group({
            body: this.fb.control(this.article.body),
        });

        if (!!id) {
            const article = await this.editorService.getArticle(+id);

            this.article = {
                id: article['id'],
                title: article['title'],
                body: article['body'],
                group: article['group'],
                description: article['description'],
                image: article['image'],
            };
        }

        this.form.get('body').setValue(this.article.body);

        const sub = this.form.get('body').valueChanges
            .subscribe(v => {
                this.article.body = v;
            });

        this.subs.push(sub);

        this.ready = true;
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }

    async save(): Promise<void> {
        try {
            if (!!this.activatedRoute.snapshot.params['id']) {
                await this.editorService.updateArticle(this.article);
            } else {
                await this.editorService.createArticle(this.article);
            }

            this.notifier.show({
                type: 'success',
                message: 'Saved successfully',
            });
        } catch (e) {
            this.notifier.show({
                type: 'error',
                message: 'Something goes wrong: ' + e,
            });

            console.error(e);
        }
    }

    async remove(): Promise<void> {
        try {
            if (!!this.article.id) {
                await this.editorService.removeArticle(this.article.id);
            } else {
                this.notifier.show({
                    type: 'error',
                    message: 'Article doesn\'t exists',
                });
            }

            this.notifier.show({
                type: 'success',
                message: 'Removed',
            });
        } catch (e) {
            this.notifier.show({
                type: 'error',
                message: 'Something goes wrong: ' + e,
            });

            console.error(e);
        }
    }

    setImage(image: string): void {
        this.article.image = image;
    }
}


import {Component, Input, OnInit} from '@angular/core';
import {NotifierService} from "angular-notifier";
import {ArticleService} from "./article.service"
import { DateTime } from "luxon";
import {AuthService} from "../user/auth.service";

export interface Article {
    id?: number;
    title: string;
    body: string;
    image: string;
    description?: string;
    group?: string;
    authorName?: string;
    author?: string;
    date?: DateTime;
}

export interface Comment {
    id?: number;
    message: string;
    createdAt: DateTime;
    authorName: string;
    authorId: number;
}

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit{
    @Input() article: Article;

    comments: Array<Comment> = []

    commentMessage: string;

    constructor(
        private articleService: ArticleService,
        public authService: AuthService,
        private notifier: NotifierService,
    ) {}

    async ngOnInit() {
        const comments: Array<object> = await this.articleService.getArticleComments(this.article.id);

        if (comments.length < 1) {
            return;
        }

        this.comments = comments.map((comment): Comment => {
            return {
                id: comment['id'],
                message: comment['message'],
                authorName: comment['author_name'],
                authorId: comment['author_id'],
                createdAt: DateTime.fromISO(comment['created_at']),
            }
        });
    }

    async sendComment(): Promise<void> {
        this.comments = this.comments.concat({
            id: 1,
            message: this.commentMessage,
            createdAt: DateTime.local(),
            authorName: 'Dmitrii Rakitin',
            authorId: 5,
        } );

        await this.articleService.createComment(this.commentMessage, this.article.id);

        this.commentMessage = '';
    }

    subscribe(): void {
        this.notifier.show({
            type: 'success',
            message: 'New subscription was created',
        });
    }
}

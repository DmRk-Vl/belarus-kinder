import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";

@Injectable()
export class ArticleService {
    constructor(private httpClient: HttpClient) {}

    async createComment(message: string, articleId: number): Promise<Object> {
        return await this.httpClient.post('http://localhost:8080/createComment', {
            message,
            articleId,
        }).toPromise();
    }

    async getArticleComments(articleId: number): Promise<any> {
        const comments = await this.httpClient.post('http://localhost:8080/getArticleComments', {
            articleId,
        }).toPromise();

        return comments || [];
    }
}

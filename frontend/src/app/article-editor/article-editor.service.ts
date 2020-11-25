import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Article} from "../article/article.component";

@Injectable()
export class ArticleEditorService {
    constructor(private httpClient: HttpClient) {}

    async getArticle(id: number): Promise<Object> {
        const payload = {
            id,
        }

        return await this.httpClient.post('http://localhost:8080/getArticle', payload).toPromise();
    }

    async createArticle(article: Article): Promise<Object> {
        const payload = {
            title: article.title,
            body: article.body,
            description: article.description,
            group: article.group,
            image: article.image,
        }

        return await this.httpClient.post('http://localhost:8080/createArticle', payload).toPromise();
    }

    async removeArticle(id: number): Promise<void> {
        const payload = {
            id,
        }

        await this.httpClient.post('http://localhost:8080/removeArticle', payload).toPromise();
    }

    async updateArticle(article: Article): Promise<Object> {
        const payload = {
            id: article.id,
            title: article.title,
            body: article.body,
            description: article.description,
            image: article.image,
        }

        return await this.httpClient.post('http://localhost:8080/updateArticle', payload).toPromise();
    }
}

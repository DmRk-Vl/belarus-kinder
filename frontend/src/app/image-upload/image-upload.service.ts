import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";

@Injectable()
export class ImageUploadService {
    constructor(private httpClient: HttpClient) {}

    async uploadImage(image: File): Promise<Object> {
        const fb = new FormData();

        fb.append('image', image, image.name);

        return await this.httpClient.post('http://localhost:8080/upload', fb).toPromise();
    }
}

import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ImageUploadService} from "./image-upload.service";
import {NotifierService} from "angular-notifier";

const availableFormats = ['image/png', 'image/jpg', 'image/jpeg'];

@Component({
    selector: 'image-upload',
    templateUrl: 'image-upload.component.html',
})
export class ImageUploadComponent {
    @Input() image: string;

    @Output() uploaded: EventEmitter<string> = new EventEmitter(undefined);

    constructor(
        private imageUploadService: ImageUploadService,
        private notifier: NotifierService,
    ) {}

    selectedFile: File;

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];

        if (availableFormats.includes(this.selectedFile.type)) {
            const reader = new FileReader();

            reader.readAsDataURL(this.selectedFile);

            reader.onloadend = () => {
                this.image = <string>reader.result;

                this.uploaded.emit(this.image)

                this.notifier.show({
                    type: 'success',
                    message: 'Image was uploaded successfully',
                });
            }
        }
    }
}

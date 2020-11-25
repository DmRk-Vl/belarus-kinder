import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotifierService} from "angular-notifier";

@Component({
    selector: 'message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
    @Input() image: string;

    @Output() messageWasSent: EventEmitter<boolean> = new EventEmitter(false);
    
    constructor(
        private notifier: NotifierService,
    ) {}

    sendMessage(): void {
        this.notifier.show({
            type: 'success',
            message: 'Message was sent successfully',
        });

        this.messageWasSent.emit(true);
    }
}

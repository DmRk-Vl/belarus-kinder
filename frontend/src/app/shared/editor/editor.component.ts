import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

const maxLineLength: number = 20;

@Component({
    selector: 'editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
    @Input() control: FormControl;

    context: any;

    position: number;

    set text(v: string) {
        this.control.setValue(v);
    }

    get text() {
        if (this.control.value.length === 0) {
            return '1 1';
        }

        return this.control.value;
    }

    async ngOnInit(): Promise<void> {
        console.log('11111');

        this.position = this.text.length;

        this.initKeySubscriptions();

        const drawingCanvas = document.getElementById('textarea');
        if(drawingCanvas && drawingCanvas['getContext']) {
            this.context = drawingCanvas['getContext']('2d');

            this.context.fillStyle = "#000000";
            this.context.font = "10px Arial";

            this.print(this.context, this.render());
        }
    }

    private print(context: any, text: string): void {
        if (!context) {
            return;
        }

        context.clearRect(0, 0, 500, 300);

        let row: number = 1;

        while (text.length > 0) {
            const substr = text.slice(0, maxLineLength);
            text = text.slice(maxLineLength);

            context.fillText(substr, 0, 15 * row++);
        }
    }

    private render(): string {
        return this.text.slice(0, this.position) + '|' + this.text.slice(this.position);
    }

    private initKeySubscriptions(): void {
        document.addEventListener('keydown', event => {
            if (event.key.length === 1)   {
                this.position = this.position + 1;
                this.text = this.text.slice(0, this.position - 1) + event.key + this.text.slice(this.position - 1)
            } else {
                switch (event.code) {
                    case 'ArrowRight':
                        this.toRight();
                        break;
                    case 'ArrowLeft':
                        this.toLeft();
                        break;
                    case 'ArrowDown':
                        this.toDown();
                        break;
                    case 'ArrowUp':
                        this.toUp();
                        break;
                    case 'Home':
                        this.position = 0;
                        this.render();
                        break;
                    case 'End':
                        this.position = this.text.length;
                        this.render();
                        break;
                    case 'Delete':
                        if (this.text.length === this.position) {
                            break
                        }

                        this.text = this.text.slice(0, this.position) + this.text.slice(this.position + 1)
                        break;
                    case 'Backspace':
                        if (this.text.length === 0) {
                            break
                        }

                        this.text = this.text.slice(0, this.position - 1) + this.text.slice(this.position);
                        this.position = this.position - 1;
                        break;
                }
            }

            this.print(this.context, this.render());
        });
    }

    private toRight(): void {
        if (this.text.length === this.position) {

            return
        }

        this.position++;
    }

    private toLeft(): void {
        if (this.position === 0) {
            return
        }

        this.position--;
    }

    private toDown(): void {
        if (this.position + maxLineLength > this.text.length) {
            this.position += this.text.length;
        }

        this.position += maxLineLength;
    }
    private toUp(): void {
        if (this.position - maxLineLength < 0) {
            return
        }

        this.position -= maxLineLength;
    }
}


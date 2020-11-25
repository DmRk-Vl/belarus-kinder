import {Component, ElementRef, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf'

@Component({
    selector: 'contacts',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
    @ViewChild('htmlData') htmlData:ElementRef;

    download(): void {
        let DATA = this.htmlData.nativeElement;
        let doc = new jsPDF('p','pt', 'a4');

        let handleElement = {
            '#editor':function(element,renderer){
                return true;
            }
        };
        doc.fromHTML(DATA.innerHTML,55,15,{
            'width': 700,
            'elementHandlers': handleElement
        });

        doc.save('report.pdf');
    }
}

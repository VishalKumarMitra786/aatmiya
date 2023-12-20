import { Component, Input, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { NgxCaptureService } from 'ngx-capture';
import { FileSaverService } from 'ngx-filesaver';
import { tap } from 'rxjs';
import { Invoice } from '../../models/invoice.model';
@Component({
  selector: 'app-doctemplate',
  templateUrl: './doctemplate.component.html',
  styleUrl: './doctemplate.component.scss'
})
export class DoctemplateComponent implements OnInit {
  @Input() invoice!: Invoice;
  @ViewChild('screen', { static: true }) screen: any;
  invoiceDate: Date = new Date();
  dueDate: Date = new Date();
  paymentByDay: number = 10;
  penaltyRange : string = '11th to 20th';
  penaltyAfterRange: string = 'between 21st to month end';
  constructor(public captureService: NgxCaptureService, public fileSaveService: FileSaverService) {
  }

  ngOnInit(): void {
    this.invoice.total = parseInt(this.invoice.Amount) + parseInt(this.invoice.LateCharges) + parseInt(this.invoice.OtherCharges) - parseInt(this.invoice.Adjustment);
  }

  download() {
    const pdfObj = new jsPDF('p', 'mm', 'a4');
    const width = pdfObj.internal.pageSize.getWidth();
    const height = pdfObj.internal.pageSize.getHeight();
    this.captureService
      .getImage(this.screen.nativeElement, false, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      })
      .pipe(
        tap((img) => {
          console.log(img);
        }),
        tap((img) => this.downloadPDF(img))
      )
      .subscribe();
  }

  downloadImage() {
    this.captureService
      .getImage(this.screen.nativeElement, true)
      .pipe(
        tap((img) => {
          console.log(img);
        }),
        tap((img) => this.downloadImg(img))
      )
      .subscribe();
  }

  downloadImg(img: string) {
    const base64String = img.split('base64,')[1];
    const contentType = "image/png"; // Change this to the appropriate content type
    const blob = this.base64toBlob(base64String, contentType);
    this.fileSaveService.save(blob, `output.png`)
  }

  downloadPDF(img: string) {
    const base64String = img.split('base64,')[1];
    const contentType = "image/png"; // Change this to the appropriate content type
    const blob = this.base64toBlob(base64String, contentType);
    // this.fileSaveService.save(blob, "output.pdf");

    const pdfObj = new jsPDF('p', 'mm', 'a4');
    const width = pdfObj.internal.pageSize.getWidth();
    const height = pdfObj.internal.pageSize.getHeight();
    pdfObj.addImage(URL.createObjectURL(blob), 'JPEG', 0, 0, width, height);
    const fileName = `output.pdf`;
    pdfObj.save(fileName);

  }


  base64toBlob(b64Data: any, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}

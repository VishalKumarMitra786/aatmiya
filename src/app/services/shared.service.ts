import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice.model';
import jQuery from 'jquery';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private datePipe: DatePipe) { }

  csvJSON(csv: any) {

    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",") as Array<string>;
    headers = headers.map(x => x.trim());
    for (var i = 1; i < lines.length; i++) {

      var obj: any = {};
      var currentline = lines[i].split(",") as Array<string>;
      currentline = currentline.map(x => x.trim());
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      if (obj[headers[0]])
        result.push(obj);

    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  async downloadAll(invoices: Array<Invoice>, isSingleDownload: boolean = false, index?: number) {
    if (invoices && invoices.length) {
      const elements = jQuery('.container-real');
      if (isSingleDownload) {
        for (let i = 0; i < elements.length; i++) {
          const payslip = invoices[i];
          if (index === i) {
            await this.download(i, payslip);
          }
        }
      } else {
        for (let i = 0; i < elements.length; i++) {
          const payslip = invoices[i];
          if (payslip.Email) {
            await this.download(i, payslip);
          }
        }
      }
    }
  }

  async download(index: number, invoice: Invoice) {
    return new Promise((resolve, reject) => {
      const elements = jQuery('.container-real');
      elements.attr('style', 'display:block');
      const elementJ = jQuery(`#container_${index}`);
      const element = elementJ[0];
      if (element) {
        const data = element;
        html2canvas(data).then(canvas => {
          const contentDataURL = canvas.toDataURL('image/jpeg');
          elements.attr('style', 'display:none');
          // p stands for potrait (Landscape or Portrait ),(mm, cm, in), (A2, A4 etc) A4 size page of PDF
          const pdfObj = new jspdf('p', 'mm', 'a4');
          const width = pdfObj.internal.pageSize.getWidth();
          const height = pdfObj.internal.pageSize.getHeight();
          pdfObj.addImage(contentDataURL, 'JPG', 0, 0, width, height);
          const pd = invoice.PaymentDate ? `!${invoice.PaymentDate}` : '';

          const fileName = `${invoice.Email}!${invoice.InvoiceDate}!${invoice.Paid}!${invoice.No}${pd}.pdf`;
          pdfObj.save(fileName);
          resolve(true);
        });
      }
    });
  }
}

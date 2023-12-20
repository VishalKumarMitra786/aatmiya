import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent implements OnInit {
  constructor(public sharedService: SharedService) {
  }

  @ViewChild('fileUpload') imgUpload: any;
  invoices: Array<Invoice> = new Array<Invoice>();
  files: any;
  selectedFile: any;

  ngOnInit(): void {
  }

  selectFile(event: any) {
    this.files = event.target.files;
    if (this.files && this.files.length > 0) {
      this.selectedFile = this.files.item(0);
      this.imgUpload.nativeElement.value = "";
      if (this.selectedFile.name.indexOf('.csv') > -1) {
        const reader: FileReader = new FileReader();
        reader.readAsText(this.selectedFile);
        reader.onload = (e) => {
          const csv: string = reader.result as string;
          let jso = <Array<Invoice>>JSON.parse(this.sharedService.csvJSON(csv));

          jso.forEach(x => {
            x.DueDateObj = this.convertDateStringToDate(x.DueDate);
            x.InvoiceDateObj = this.convertDateStringToDate(x.InvoiceDate);
            x.PaymentDateObj = x.PaymentDate ? this.convertDateStringToDate(x.PaymentDate) : null;
          })
          // jso = jso.filter(x => x.SalarySlip !== '');
          this.invoices = jso;
          console.log(this.invoices);
        };
      } else {
        alert(`Not a valid csv`);
      }
    }
  }

  downloadAll() {
    this.sharedService.downloadAll(this.invoices);
  }

  convertDateStringToDate(dateString: string) {
    // Split the date string into day, month, and year
    var dateParts = dateString.split('-');

    // Ensure that the date string has three parts
    if (dateParts.length === 3) {
      // Parse the components as integers
      var day = parseInt(dateParts[0], 10);
      var month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JavaScript
      var year = parseInt(dateParts[2], 10);

      // Create a new Date object
      var dateObject = new Date(year, month, day);

      // Check if the date is valid
      if (!isNaN(dateObject.getTime())) {
        return dateObject;
      }
    }

    // Return null for invalid date strings
    return null;
  }
}

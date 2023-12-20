import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { DoctemplateComponent } from './doctemplate/doctemplate.component';
import { NgxCaptureModule } from 'ngx-capture';
import { FileSaverModule } from 'ngx-filesaver';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    InvoicesComponent,
    DoctemplateComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    DashboardRoutingModule,
    NgxCaptureModule,
    FileSaverModule,
  ]
})
export class DashboardModule { }

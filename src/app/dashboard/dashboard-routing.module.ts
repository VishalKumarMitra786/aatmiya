import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './invoices/invoices.component';

const routes: Routes = [
  { path: '', redirectTo: 'invoices', pathMatch: 'full' }, // Default route redirects to 'home'
  { path: 'invoices', component: InvoicesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

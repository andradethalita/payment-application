import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PaymentsDashboardComponent } from './pages/payments-dashboard/payments-dashboard.component';
import { AuthGuard } from './services/guards/auth.guard';
import { AddPaymentComponent } from './pages/add-payment/add-payment.component';
import { EditPaymentComponent } from './pages/edit-payment/edit-payment.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'payments-dashboard',
    component: PaymentsDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-payment',
    component: AddPaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-payment/:id',
    component: EditPaymentComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

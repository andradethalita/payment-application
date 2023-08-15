import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaymentData } from 'src/app/interfaces/payment-data';
import { PaymentDataService } from 'src/app/services/payment/payment-data.service';

@Component({
  selector: 'app-payments-dashboard',
  templateUrl: './payments-dashboard.component.html',
  styleUrls: ['./payments-dashboard.component.scss']
})
export class PaymentsDashboardComponent implements OnInit {

  payments: PaymentData[] = [];
  currentPage: number = 1;
  paymentsPerPage: number = 5;

  constructor(
    private paymentDataService: PaymentDataService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.paymentDataService.getPayments().subscribe(payments => {
      this.payments = this.sortPayments(payments);
    })
  }

  sortPayments(payments: PaymentData[]): PaymentData[] {
    return payments.sort((a, b) => {
      if (a.isPayed === b.isPayed) {
        return 0;
      }
      return a.isPayed ? -1 : 1;
    });
  }
}

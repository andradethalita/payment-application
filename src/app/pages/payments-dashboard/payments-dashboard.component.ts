import { Component, OnInit } from '@angular/core';
import { PaymentData } from 'src/app/interfaces/payment-data';
import { PaymentDataService } from 'src/app/services/payment/payment-data.service';

@Component({
  selector: 'app-payments-dashboard',
  templateUrl: './payments-dashboard.component.html',
  styleUrls: ['./payments-dashboard.component.scss']
})
export class PaymentsDashboardComponent implements OnInit {

  payments: PaymentData[] = [];

  constructor(private paymentDataService: PaymentDataService) { }

  ngOnInit(): void {
    this.paymentDataService.getPayments().subscribe(payments => {
      this.payments = payments;
    })
  }

}

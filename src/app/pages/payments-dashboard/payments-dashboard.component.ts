import { Component, OnInit } from '@angular/core';
import { PaymentData } from 'src/app/interfaces/payment-data';
import { PaymentDataService } from 'src/app/services/payment/payment-data.service';

@Component({
  selector: 'app-payments-dashboard',
  templateUrl: './payments-dashboard.component.html',
  styleUrls: ['./payments-dashboard.component.scss']
})
export class PaymentsDashboardComponent implements OnInit {

  pageTitle: string = "Dashboard Pagamentos";
  payments: PaymentData[] = [];
  currentPage: number = 1;
  paymentsPerPage: number = 5;
  showDeleteModal: boolean = false;
  paymentIdToDelete: number | null = null;
  shouldShowDirectionLinks: boolean = false;


  constructor(
    private paymentDataService: PaymentDataService,
  ) { }


  ngOnInit(): void {
    this.paymentDataService.getPayments().subscribe(payments => {
      this.payments = this.sortPayments(payments);
      this.shouldShowDirectionLinks = this.calculateShouldShowDirectionLinks();
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

  openDeleteModal(paymentId: number): void {
    this.paymentIdToDelete = paymentId;
    this.showDeleteModal = true;
    console.log("OpenDelete");

  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.paymentIdToDelete = null;
    console.log("CancelDelete");
  }

  confirmDelete(): void {
    console.log("ConfirmDelete");
    if (this.paymentIdToDelete !== null) {
      this.paymentDataService.deletePayment(this.paymentIdToDelete).subscribe(
      response => {
        this.payments = this.payments.filter(payment => payment.id !== this.paymentIdToDelete);
        this.paymentDataService.getPayments().subscribe(payments => {
          this.payments = this.sortPayments(payments);
          this.cancelDelete();
        });
      },
      error => {
        console.error('Erro na exclusão:', error);
      });
    }

  }

  calculateShouldShowDirectionLinks(): boolean {
    const totalPages = Math.ceil(this.payments.length / this.paymentsPerPage);
    return totalPages > 3;
  }
}

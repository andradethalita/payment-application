import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  filter: string = '';
  listPayments: PaymentData[] = [];
  totalPages: number = 0;
  allPages: number[] = [];
  visiblePages: number[] = [];

  constructor(
    private paymentDataService: PaymentDataService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getPayments();

  }

  getPayments(): void {
    this.paymentDataService.getPayments().subscribe(payments => {
      this.payments = this.sortPayments(payments);
      this.totalPages = Math.ceil(this.payments.length / this.paymentsPerPage);
      this.allPages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updateVisiblePages();
    })
  }

  onCheckboxChange(payment: PaymentData): void {
    this.paymentDataService.changeStatusIsPayed(payment).subscribe(
      () => {
        const updatedPaymentIndex = this.payments.findIndex(p => p.id === payment.id);
        if (updatedPaymentIndex !== -1) {
          this.payments[updatedPaymentIndex].isPayed = payment.isPayed;
          this.payments = this.sortPayments(this.payments);
        }
      },
      error => {
        console.error('Erro ao atualizar o valor isPayed no servidor:', error);
        payment.isPayed = !payment.isPayed;
      }
    );
  }

  sortPayments(payments: PaymentData[]): PaymentData[] {
    return payments.sort((a, b) => {
      if (a.isPayed !== b.isPayed) {
        return a.isPayed ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
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

  filterPayments(): void {
    this.currentPage = 1;
    this.paymentDataService.listPayments(this.filter, this.currentPage)
      .subscribe(listPayments => {
        this.payments = this.sortPayments(listPayments);
      })
  }

  clearFilter(): void {
    this.filter = '';
    this.getPayments();
  }


  updateVisiblePages(): void {
    const maxVisiblePages = 3;
    const startPage = Math.max(this.currentPage - Math.floor(maxVisiblePages / 2), 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, this.totalPages);

    this.visiblePages = this.allPages.slice(startPage - 1, endPage);
  }

  handleInput(): void {
    if (this.filter.trim() === '') {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([this.router.url]);
      this.clearFilter();
    }
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getPayments();
  }
}

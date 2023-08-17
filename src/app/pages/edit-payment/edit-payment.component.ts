import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentDataService } from 'src/app/services/payment/payment-data.service';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.scss'],
})
export class EditPaymentComponent implements OnInit {
  pageTitle: string = 'Editar Pagamento';
  formEditPayment!: FormGroup;

  constructor(
    private paymentDataService: PaymentDataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.paymentDataService.searchById(parseInt(id!)).subscribe((payment) => {
      this.formEditPayment = this.formBuilder.group({
        id: [payment.id],
        name: [payment.name, Validators.required],
        title: [payment.title, Validators.required],
        value: [payment.value, [Validators.required, Validators.min(0)]],
        date: [payment.date, Validators.required],
        isPayed: [payment.isPayed],
      });
    });
  }

  editPaymentData() {
    if (this.formEditPayment.valid) {
      this.paymentDataService
        .editPaymentData(this.formEditPayment.value)
        .subscribe(() => {
          this.router.navigate(['/payments-dashboard']);
        });
    }
  }

  cancelEdit() {
    this.router.navigate(['/payments-dashboard']);
  }
}

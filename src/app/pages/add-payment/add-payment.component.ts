import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentDataService } from 'src/app/services/payment/payment-data.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
})
export class AddPaymentComponent implements OnInit {
  pageTitle: string = 'Adicionar Pagamento';
  formAddPayment!: FormGroup;
  addAttempt: boolean = false;

  constructor(
    private paymentDataService: PaymentDataService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formAddPayment = this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      value: [null, [Validators.required, Validators.min(1)]],
      date: [null, Validators.required],
    });
  }

  addPaymentData() {
    this.addAttempt = true;

    if (this.formAddPayment.valid) {
      const formData = this.formAddPayment.value;
      this.paymentDataService.createPaymentData(formData).subscribe(() => {
        this.router.navigate(['/payments-dashboard']);
      });
    }
  }
}

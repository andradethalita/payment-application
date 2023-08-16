import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  formAddPayment!: FormGroup;

  pageTitle: string = "Adicionar Pagamento";

  constructor() { }

  ngOnInit(): void {
  }

}

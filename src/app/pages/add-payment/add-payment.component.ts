import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  pageTitle: string = "Adicionar Pagamento";

  constructor() { }

  ngOnInit(): void {
  }

}

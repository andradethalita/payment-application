import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentData } from 'src/app/interfaces/payment-data';

@Injectable({
  providedIn: 'root'
})
export class PaymentDataService {

  private apiUrl = 'http://localhost:3000/payments';

  constructor( private http: HttpClient) { }

  getPayments(): Observable<PaymentData[]> {
    return this.http.get<PaymentData[]>(this.apiUrl);
  }

  deletePayment(id: number): Observable<PaymentData> {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<PaymentData>(url)
  }

  updatePayment(payment: PaymentData): Observable <PaymentData> {
    const url = `${this.apiUrl}/${payment.id}`;
    return this.http.put<PaymentData>(url, payment);
  }

  changeStatusIsPayed(payment: PaymentData): Observable <PaymentData> {
    payment.isPayed = !payment.isPayed
    return this.updatePayment(payment)
  }

  createPaymentData(payment: PaymentData): Observable <PaymentData>{
    return this.http.post<PaymentData>(this.apiUrl, payment)
  }

  editPaymentData(payment: PaymentData): Observable <PaymentData> {
    const url = `${this.apiUrl}/${payment.id}`
    return this.http.put<PaymentData>(url, payment)
  }

  searchById(id: number): Observable <PaymentData> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<PaymentData>(url);
  }
}

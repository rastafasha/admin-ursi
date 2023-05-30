import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  title = "Detalle Pago";
  payment: Payment;
  error: string;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.getPagoById(id));
  }
  getUser(id:number){
    this.paymentService.getPagosbyUser(id).subscribe(
      res =>{
        this.payment = res;
        error => this.error = error
        console.log(this.payment);
      }
    );
  }

  getPagoById(id:number){
    this.paymentService.getPagoById(id).subscribe(
      res=>{
        this.payment = res;
        console.log(this.payment);
      }
    )
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}

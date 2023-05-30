import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';


@Component({
  selector: 'app-pagos-recientes',
  templateUrl: './pagos-recientes.component.html',
  styleUrls: ['./pagos-recientes.component.css']
})
export class PagosRecientesComponent implements OnInit {

  payments: Payment;
  error:string;

  constructor(
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.getPagosRecientes();
  }

  getPagosRecientes(): void {
    this.paymentService.getRecientes().subscribe(
      res =>{
        this.payments = res;
        error => this.error = error
        // console.log(this.payments);
      }
    );
  }

}

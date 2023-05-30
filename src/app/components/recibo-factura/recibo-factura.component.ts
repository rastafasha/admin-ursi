import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-recibo-factura',
  templateUrl: './recibo-factura.component.html',
  styleUrls: ['./recibo-factura.component.css']
})
export class ReciboFacturaComponent implements OnInit {

  title = "Factura";
  pago: Payment;
  error: string;

  @Input() amount;
  @Input() items;
  @Input() reference;
  @Input() email;
  @Input() name;
  @Input() status;


  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.getPagoById(id));
    // this.getPagoById(this.id, this.reference, this.email, this.name,
    //   this.status, this.amount, this.items,
    //   );
  }

  getPagoById(id:number){debugger
    this.paymentService.getPagosbyUser(id).subscribe(
      res=>{
        this.pago = res;
        console.log(this.pago);
      }
    )
  }



}

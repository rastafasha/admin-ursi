import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() amount;
  @Input() items;
  @Input() reference;
  @Input() email;
  @Input() name;
  @Input() surname;
  @Input() status;



  public PaymentRegisterForm: FormGroup;
  paymentSeleccionado:Payment;

  pagopaypal;
  user:User;
  constructor(
    public activeModal:NgbActiveModal,
    public router: Router,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.user = userService.user
  }

  ngOnInit(): void {
    this.getUser();
    this.procesarPagoPaypal(this.reference, this.email, this.name, this.surname,
      this.status, this.amount, this.items,
      );

  }

  closeModal(): void{
    this.activeModal.dismiss('Cross click');
    this.router.navigateByUrl('/dashboard/historial-pagos');

  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }


  procesarPagoPaypal(reference: any, email: any, name: any, surname: any,
    status: any, amount: any, items:any,
    ){debugger
    //crear

    let data = {
      referencia: reference,
      email,
      nombre: name,
      surname,
      status: 'APPROVED',
      metodo: 'Paypal',
      bank_name: 'Paypal',
      monto: amount,
      currency_id: 1,
      plan_id: '1',
      user_id: this.user.id,
      txn_id: 1,
      validacion: 'PENDING',
      moneda_codigo: items[0].unit_amount.currency_code,
    }
    if(data){
      this.paymentService.create(data)
      .subscribe( (resp: any) =>{
        // Swal.fire('Creado', `creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/historial-pagos`);
        this.enviarNotificacion();
        this.pagopaypal = resp;
        console.log(this.pagopaypal);
      })

    }

  }

  enviarNotificacion(): void {
    this.alertService.success("Mensaje de Pago","Nuevo Pago Paypal, Favor verificar!");
  }

}

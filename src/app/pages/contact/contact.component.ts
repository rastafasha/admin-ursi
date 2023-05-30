import { Component, OnInit } from '@angular/core';
import { CmspageService } from '../../services/cmspage.service';
import { Contact } from '../../models/contact';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  title = "Contacto"
  error: string;

  contactForm:FormGroup;
  constructor(
    private router: Router,
    private cmspageService: CmspageService,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.closeMenu();
    window.scrollTo(0,0);
    this.iniciarFormulario();
  }
  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  iniciarFormulario(){
    this.contactForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      status: new FormControl('PENDING', [Validators.required])
      })

  }


  get f() { return this.contactForm.controls; }

  enviarEmail() {
    this.cmspageService.contactForm(this.contactForm.value).subscribe(
      res => {
        if (this.error) {
          // Swal.fire('Error', this.error, 'error');
          console.log(this.error)
        } else {
          // Swal.fire('Enviado!', 'El email fue enviado', 'success');
          this.router.navigate(['/']);
        }
      },
      error => this.error = error
    );
  }



  gotoHome() {
    this.router.navigate(['/']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Cliente, Reserva } from '../models/reserva'; 
import { ReservaService } from '../services/reserva.service'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public clientes: Cliente[];
  public cliente: Cliente;
  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private persona: ReservaService,
    private router: Router,
    private tC: ToastController
  ) { }

  ngOnInit() {
    this.persona.getClientes().subscribe((res) => {
      this.clientes = res;
    });
    this.myForm = this.fb.group({
      telefono: [],
    });
  }

  
  async ingresar() {
    if (this.myForm.get('telefono').value == '3112272687') {//es el admin
      this.router.navigate(['/admin']);
    } else {
      if (this.existeReserva()) {
        this.router.navigate(['/home'], {
          queryParams: {
            telefono: this.myForm.get('telefono').value
          },
        });
      } else {
        let toast = await this.tC.create({
          message: 'No se encontraron coincidencias',
          duration: 1500,
        });
        toast.present();
      }
    }
    this.myForm.reset();
  }
  
  existeReserva(): Boolean {
    let existe=false;
    for (var i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].telefono == this.myForm.get('telefono').value) {
        this.cliente = this.clientes[i];
        existe = true;
      }
    }
    return existe;
  }


  

} 

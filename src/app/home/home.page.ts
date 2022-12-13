import { Cliente, Reserva } from './../models/reserva';
import { ReservaService } from '../services/reserva.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
}) 
export class HomePage {
  //precio=100
  private reservas: Reserva[];
  public fecha = new Date();

  public myForm: FormGroup;
  public total = 1000;
  private reserva: Reserva;
  private cliente: Cliente;
  public diaActual;
  public event?: Event;
  public prof1 = 0;
  public prof2 = 0;
  brincolin:boolean=false;
  mesa:boolean=false;
  futbolito:boolean=false;

  constructor( 
    private reservasService: ReservaService,
    private personService: ReservaService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private tC: ToastController
    ) {
      this.reserva = {
        fecha: this.fecha.toString(),
        total: 0,
        nombre: '',
        telefono: '',
        id: '',
      };
    }
 
  ngOnInit(){
    this.activatedRoute.queryParams.subscribe((params) => {
      let telefono = params['telefono'];
      this.personService.getClienteByTelefono(telefono).subscribe((res) => {
        this.cliente = res[0];
      });
    });
    this.reservasService.getReservas().subscribe((res) => {
      this.reservas = res;
    });
    this.diaActual = new Date(); //a partir de mañana
    console.log(this.diaActual);
    this.myForm = this.fb.group({
      fecha: [],
    });
  }


  public async addReserva() {
    this.fecha = new Date(this.myForm.get('fecha').value);
    //console.log(this.fecha);

    if (this.fecha > this.diaActual) {
      if (this.diaOcupado()) {
        let toast = await this.tC.create({
          message: 'Esa fecha esta ocupada, elige otra',
          duration: 1500,
        });
        toast.present();
      } else {
        this.reserva = {
          fecha: this.fecha.toLocaleDateString(),
          total: this.total,
          nombre: 'polo',
          telefono: '3112272687',
        };
        this.reservasService.nuevaReserva(this.reserva);
        let toast = await this.tC.create({
          message: 'Se creo la reserva',
          duration: 1500,
        });
        toast.present();
      }

    } else {
      let toast = await this.tC.create({
        message: 'Debes de seleccionar una fecha de mañana en adelante',
        duration: 1500,
      });
      toast.present();
    }
  }


  public diaOcupado(): Boolean {
    let fechaSeleccionada = this.fecha.toLocaleDateString();
    let ocupado = false;

    for (let index = 0; index < this.reservas.length; index++) {
      let diaOcupado = this.reservas[index].fecha;
      console.log('propuesta ' + fechaSeleccionada);
      console.log('ocupada   ' + diaOcupado);
      if (fechaSeleccionada == diaOcupado) {
        ocupado = true;
        console.log(ocupado);
        return (ocupado = true);
      }
    }
    console.log(ocupado);
    return ocupado;
  }


  toggleCambiado(event, modo, boton) {
    if (boton == 'mesa') { this.mesa = !modo;
      if (!modo) { this.total += 150;
      } else this.total -= 150;
    }

    if (boton == 'brincolin') { this.brincolin = !modo;
      if (!modo) { this.total += 200;
      } else this.total -= 200;
    }

    if (boton == 'futbolito') { this.futbolito = !modo;
      if (!modo) { this.total += 100;
      } else this.total -= 100;
    }
    console.log(event.target.value, this.brincolin, this.mesa, this.futbolito);
  }

  rangeCambiado(event) {
    this.prof1 = event.target.value;
    this.total = this.total - this.prof2 * 5 + this.prof1 * 5;
    this.prof2 = this.prof1;
  }

  


}

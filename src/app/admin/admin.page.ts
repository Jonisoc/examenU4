import { Component, OnInit } from '@angular/core';
import { Reserva } from '../models/reserva';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  
  proximas2: Reserva[];
  reservas: Reserva[];
  sig2: boolean;
  todasLasReservas: Reserva[];

  constructor(private reservasService: ReservaService,) { }

  ngOnInit() {
    this.reservasService.getReservas().subscribe((res) => {
      this.todasLasReservas = res;
      this.reservas = this.todasLasReservas
    });
    this.reservasService.get2Reservas().subscribe((res) => {
      this.proximas2 = res;
    });
  }
 
  //Esto se usa para obtener las 2 mas proximas
  cambio(event) {
    this.sig2 = event.detail.checked
    console.log(this.sig2)

    if(this.sig2){
      this.reservas = this.proximas2
      console.log('sig 2 '+this.reservas);
    }else{
      this.reservas = this.todasLasReservas
      console.log('sig '+this.reservas);
    }
  }

}

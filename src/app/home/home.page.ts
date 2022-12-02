import { Reserva } from './../models/reserva';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  precio=1000
  public reserva: Reserva;
  public myForm: FormGroup;

  constructor( private fb: FormBuilder, private route:Router) {}
 
  ngOnInit(){
    this.myForm = this.fb.group({
      fecha:["", Validators.required],
      alberca:["", Validators.required],
      brincolin:["", Validators.required],
      mesa:["", Validators.required],
      futbolito:["", Validators.required]
    });
  }

  brincolin(){
    this.precio+=200;
  }

  mesa(){
    this.precio+=150;
  }

  futbolito(){
    this.precio+=100;
  }

  recuperar(e){
    
  }
   
  /*public newReserva() {
    this.reserva = {

      fecha: this.myForm.controls.fecha.value,
      name: this.myForm.controls.name.value,
      curp: this.myForm.controls.curp.value,
      age: this.myForm.controls.age.value,
      nip: this.myForm.controls.nip.value,
      email: this.myForm.controls.email.value,
      career: this.myForm.controls.career.value,
      photo: this.myForm.controls.photo.value,
    }

    //this.studentService.newStudent(this.student);
    
    //this.route.navigate([".."]);
  }*/

  

}

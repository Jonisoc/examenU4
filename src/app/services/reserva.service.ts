import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva';
import { Cliente } from '../models/reserva';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  //private reservas:Reserva[];
  //private clientes:Cliente[];
  private reserva?: Reserva[];
  private clientes: Cliente[];

  constructor(private firestore: AngularFirestore) {
    //this.reservas = [];
    //this.clientes = [];
   }

   /*public getReservas(){
    return this.firestore.collection('reserva').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data() as Reserva;
          const id = a.payload.doc.id;
          return{ id, ...data};
        })
      })
    )
  }
 
  public getClientes(){
    return this.firestore.collection('cliente').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data() as Cliente;
          const id = a.payload.doc.id;
          return{ id, ...data};
        })
      })
    )
  }

  public newReserva(reserva: Reserva):Boolean{
    //Recibe una reserva y checa si la fecha es valida, si no es valida retorna false
    if(this.checkFechaReserva(reserva.fecha)){
      this.firestore.collection('reserva').add(reserva);
      return true;
    }else{
      //No se insertó debido a fecha incorrecta
      return false;
    }
    
  }

  public checkFechaReserva(fecha: String):Boolean{
    let reservas:Reserva[];
    this.getReservas().subscribe(res =>{
      reservas = res;
    });
    //Compara la fecha introducida con todas las fechas de la BDD, si ya se encuentra la fecha (solo los primeros digitos 2022-10-15) retorna un falso
    for (let i = 0; i < reservas.length; i++) {
      if(fecha.substring(0,10) == reservas[i].fecha.substring(0,10)){
        return false;
      }
    }
    return true;
  }

  public loginTelefono(tel: String):Object{
    //Recibe un string telefono y a partir de ahí hace la busqueda para saber si existe o no, en caso de que no exista retorna falso, si existe retorna el telefono y el
    //nombre, dichos campos los debes agregar al objeto reserva que es el que envias al newReserva()
    let clientes:Cliente[];
    this.getClientes().subscribe(res =>{
      clientes = res;
    });
    //Compara el telefono introducido, si existe regresa un objeto con el telefono y el nombre, estos se deben enviar posteriormente al objeto de la reserva
    //Si el telefono no existe se retorna un null
    for (let i = 0; i < clientes.length; i++) {
      if(tel == clientes[i].telefono){
        let objeto = {
          telefono: clientes[i].telefono,
          nombre: clientes[i].nombre
        }
        return objeto;
      }
    }
    return null;
  }*/


  public getReservas(): Observable<Reserva[]> {
    return this.firestore
      .collection('reserva')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Reserva;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  //aqui cambio date por fecha
  public get2Reservas(): Observable<Reserva[]> {
    return this.firestore
      .collection('reserva', (ref) =>
        ref.where('fecha', '>=', new Date().toLocaleDateString()).orderBy('fecha', 'asc').limit(2)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Reserva;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  public getOcupado(comprobarFecha): Observable<Reserva[]> {
    return this.firestore
      .collection('reserva')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions
            .map((a) => {
              const data = a.payload.doc.data() as Reserva;
              const id = a.payload.doc.id;
              return { id, ...data };
            })
            .filter((reserva) => reserva.fecha == comprobarFecha);
        })
      );
  } 

  public nuevaReserva(reserva: Reserva) {
    this.firestore.collection('reserva').add(reserva);
  }


  public getClientes(): Observable<Cliente[]> {
    return this.firestore
      .collection('cliente')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Cliente;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  public getClienteByTelefono(telefono: string): Observable<Cliente[]> {
    return this.firestore
      .collection('cliente')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Cliente;
            const id = a.payload.doc.id;
            return { id, ...data };
          }).filter(cliente => cliente.telefono == telefono)
        })
      );
  }


}

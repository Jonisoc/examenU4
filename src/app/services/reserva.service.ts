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
  private reserva?: Reserva[];
  private clientes: Cliente[];

  constructor(private firestore: AngularFirestore) {

   }


   public getClienteByTelefono(telefono: string): Observable<Cliente[]> {
    return this.firestore.collection('cliente').snapshotChanges().pipe(map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Cliente;
            const id = a.payload.doc.id;
            return { id, ...data };
          }).filter(cliente => cliente.telefono == telefono)
        })
      );
  }
 

  public getReservas(): Observable<Reserva[]> {
    return this.firestore.collection('reserva').snapshotChanges().pipe(map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Reserva;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }


  //Se ordenasn las fechas de forma ascendente y solo se guardan las 2 primesas para posteriormente mostrarse
  public get2Reservas(): Observable<Reserva[]> {
    return this.firestore.collection('reserva', (ref) =>
        ref.where('fecha', '>=', new Date().toLocaleDateString()).orderBy('fecha', 'asc').limit(2)).snapshotChanges().pipe(map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Reserva;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  public getOcupado(comprobarFecha): Observable<Reserva[]> {
    return this.firestore.collection('reserva').snapshotChanges().pipe(map((actions) => {
          return actions.map((a) => {
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
    return this.firestore.collection('cliente').snapshotChanges().pipe(map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Cliente;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  


}

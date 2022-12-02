import { Reserva, Cliente } from './reserva';

describe('Reserva', () => {
  it('should create an instance', () => {
    expect(new Reserva()).toBeTruthy();
  });
});

describe('Cliente', () => {
  it('should create an instance', () => {
    expect(new Cliente()).toBeTruthy();
  });
});
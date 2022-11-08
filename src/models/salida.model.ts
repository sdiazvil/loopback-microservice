import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'salida'
    }, strict: true
  }
})
export class Salida extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id_operacion: number;

  @property({
    type: 'number',
    required: true,
  })
  cc: number;

  @property({
    type: 'string',
    required: true,
  })
  cod_articulo: string;

  @property({
    type: 'number',
    required: true,
  })
  sugerencia: number;


  constructor(data?: Partial<Salida>) {
    super(data);
  }
}

export interface SalidaRelations {
  // describe navigational properties here
}

export type SalidaWithRelations = Salida & SalidaRelations;

// Uncomment these imports to begin using these cool features!

import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {Salida} from '../models/salida.model';
import {SalidaRepository} from '../repositories/salida.repository';

// import {inject} from '@loopback/core';

require('dotenv').config();

const pgp = require('pg-promise')({
  schema: 'prueba' /* can also be an array of strings or a callback */
});

const db = pgp(process.env.DATABASE);
const cs = new pgp.helpers.ColumnSet([
  {name: 'id_operacion'},
  {name: 'cc'},
  {name: 'cod_articulo'},
  {name: 'sugerencia'}
], {table: 'salida'});

export class SalidaController {
  constructor(@repository(SalidaRepository)
  public salidaRepository: SalidaRepository,) { }

  @post('/salidas')
  @response(200, {
    description: 'Contact model instance',
    content: {'application/json': {schema: getModelSchemaRef(Salida)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Salida, {
              title: 'NewArraySalida',
            }),
          }
        },
      },
    })
    salida: Salida[]
  ): Promise<{}> {
    salida.forEach(item => this.salidaRepository.create(item))
    return salida;
  }

  @get('/salidas')
  @response(200, {
    description: 'Array of Salida model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Salida, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Salida) filter?: Filter<Salida>,
  ): Promise<Salida[]> {
    return this.salidaRepository.find(filter);
  }

  @post('/salidas-bulk')
  @response(200, {
    description: 'Contact model instance',
    content: {'application/json': {schema: getModelSchemaRef(Salida)}},
  })
  async createBulk(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Salida, {
              title: 'NewArraySalida',
              //exclude: ['id'],
            }),
          }
        },
      },
    })
    salida: Salida[]
  ): Promise<any> {
    // await db.tx('massive-insert', (t: any) => {
    //   const processData = (data: any) => {
    //     if (data) {
    //       const insert = pgp.helpers.insert(data, cs);
    //       return t.none(insert);
    //     }
    //   };
    //   return t.sequence((index: any) => getNextData(t, index).then(processData));
    // })
    //   .then((data: any) => {
    //     // COMMIT has been executed
    //     console.log('Total batches:', data.total, ', Duration:', data.duration);
    //   })
    //   .catch((error: any) => {
    //     // ROLLBACK has been executed
    //     console.log(error);
    //   });
    db.tx('massive-insert', (t: any) => {
      const processData = (data: any) => {
        if (data) {
          const insert = pgp.helpers.insert(data, cs);
          return t.none(insert);
        }
      };
      return t.sequence((index: any) => getNextData(t, 2).then(processData));
    })
      .then((data: any) => {
        // COMMIT has been executed
        console.log('Total batches:', data.total, ', Duration:', data.duration);
      })
      .catch((error: any) => {
        // ROLLBACK has been executed
        console.log(error);
      });
  }

  @post('/salidas-bulk-dos')
  @response(200, {
    description: 'Contact model instance',
    content: {'application/json': {schema: getModelSchemaRef(Salida)}},
  })
  async createBulkDos(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Salida, {
              title: 'NewArraySalida',
              //exclude: ['id'],
            }),
          }
        },
      },
    })
    salida: Salida[]
  ): Promise<{}> {
    let response = {response: 'inicial'}
    let data = [];
    for (let i = 0; i < 30000; i++) {
      data.push({
        id_operacion: i,
        cc: 1456,
        cod_articulo: 'dsadas2',
        sugerencia: 17
      });
    }
    const insert = pgp.helpers.insert(data, cs);
    //=> INSERT INTO "products"("title","price","units")
    //   VALUES('red apples',2.35,1000),('large oranges',4.5,1)

    try {
      await db.none(insert);
      return {response: 'Ok'};
    } catch (err: any) {
      throw err;
    }

    // await db.none(insert)
    //   .then(() => {
    //     console.log('exito')
    //     response = {response: 'Ok'}
    //     return {response: 'Ok'}
    //     // success, all records inserted
    //   })
    //   .catch((error: any) => {
    //     // error
    //     console.log(error);
    //     return {response: 'Error'}
    //   });
    // return response;
  }

}

// Generating 10,000 records 1000 times, for the total of 10 million records:
function getNextData(t: any, pageIndex: any) {
  let data = null;
  //if (pageIndex < 1000) {
  if (pageIndex < 10) {
    data = [];
    for (let i = 1; i < 10; i++) {
      const idx = pageIndex * 10000 + i; // to insert unique product names
      data.push({
        id_operacoon: idx + 1,
        cc: 1456,
        cod_articulo: 'dsadas2',
        sugerencia: 17
      });
    }
  }
  return Promise.resolve(data);
}

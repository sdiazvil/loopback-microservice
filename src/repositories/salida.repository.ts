import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Salida, SalidaRelations} from '../models';

export class SalidaRepository extends DefaultCrudRepository<
  Salida,
  typeof Salida.prototype.id_operacion,
  SalidaRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Salida, dataSource);
  }
}

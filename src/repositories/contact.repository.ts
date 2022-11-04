import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Contact, ContactRelations} from '../models';

export class ContactRepository extends DefaultCrudRepository<
  Contact,
  typeof Contact.prototype.id,
  ContactRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Contact, dataSource);
  }
}

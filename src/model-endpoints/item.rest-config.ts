import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Item} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Item,
  pattern: 'CrudRest',
  dataSource: 'db',
  basePath: '/items',
  readonly: false,
};
module.exports = config;

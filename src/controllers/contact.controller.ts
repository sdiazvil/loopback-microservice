import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Contact} from '../models';
import {ContactRepository} from '../repositories';

@authenticate('jwt')
export class ContactController {
  constructor(
    @repository(ContactRepository)
    public contactRepository: ContactRepository,
  ) { }

  @post('/contacts')
  @response(200, {
    description: 'Contact model instance',
    content: {'application/json': {schema: getModelSchemaRef(Contact)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contact, {
            title: 'NewContact',
            exclude: ['id'],
          }),
        },
      },
    })
    contact: Omit<Contact, 'id'>,
  ): Promise<Contact> {
    return this.contactRepository.create(contact);
  }

  @get('/contacts/count')
  @response(200, {
    description: 'Contact model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Contact) where?: Where<Contact>,
  ): Promise<Count> {
    return this.contactRepository.count(where);
  }

  @get('/contacts')
  @response(200, {
    description: 'Array of Contact model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contact, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contact) filter?: Filter<Contact>,
  ): Promise<Contact[]> {
    return this.contactRepository.find(filter);
  }

  @patch('/contacts')
  @response(200, {
    description: 'Contact PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contact, {partial: true}),
        },
      },
    })
    contact: Contact,
    @param.where(Contact) where?: Where<Contact>,
  ): Promise<Count> {
    return this.contactRepository.updateAll(contact, where);
  }

  @get('/contacts/{id}')
  @response(200, {
    description: 'Contact model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contact, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Contact, {exclude: 'where'}) filter?: FilterExcludingWhere<Contact>
  ): Promise<Contact> {
    return this.contactRepository.findById(id, filter);
  }

  @patch('/contacts/{id}')
  @response(204, {
    description: 'Contact PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contact, {partial: true}),
        },
      },
    })
    contact: Contact,
  ): Promise<void> {
    await this.contactRepository.updateById(id, contact);
  }

  @put('/contacts/{id}')
  @response(204, {
    description: 'Contact PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() contact: Contact,
  ): Promise<void> {
    await this.contactRepository.replaceById(id, contact);
  }

  @del('/contacts/{id}')
  @response(204, {
    description: 'Contact DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contactRepository.deleteById(id);
  }
}

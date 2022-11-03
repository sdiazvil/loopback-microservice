import {User} from '@loopback/authentication-jwt';
import {model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'user'
    }, strict: true
  }
})
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

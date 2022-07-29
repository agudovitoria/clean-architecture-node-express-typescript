import { Model, model, Schema } from 'mongoose';
import UserEntity from '../../../../domain/entity/UserEntity';

class UserSchema extends Schema<UserEntity> {
  constructor() {
    super({
      firstName: {
        type: String,
        required: true
      },
      firstSurname: {
        type: String,
        required: true
      },
      secondSurname: {
        type: String,
        required: false
      },
      email: {
        type: String,
        required: true,
        unique: true
      }
    });
  }
}

export type UserEntityModel = Model<UserEntity>;

export default model<UserEntity>('Users', new UserSchema(), 'users');

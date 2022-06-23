import { model, Schema } from 'mongoose';
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

export default <UserEntityModel>(model<UserEntity>('Users', new UserSchema()));

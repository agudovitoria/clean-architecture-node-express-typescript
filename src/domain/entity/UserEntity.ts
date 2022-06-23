import { Document } from 'mongoose';

interface UserEntity extends Document {
  id: string;
  email: string;
  firstName: string;
  firstSurname: string;
  secondSurname: string;
}

export default UserEntity;

import User from '../User';

interface UserDTO {
  id: string;
  firstName: string;
  firstSurname: string;
  secondSurname: string;
  email: string;

  toDomain(): User;
}

export default UserDTO;

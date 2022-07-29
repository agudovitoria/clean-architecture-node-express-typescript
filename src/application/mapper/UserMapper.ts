import { injectable } from 'tsyringe';
import UserDTO from '../../domain/dto/UserDTO';
import Mapper from '../../domain/interfaces/Mapper';
import User from '../../domain/User';
import UserEntity from '../../domain/entity/UserEntity';

export type UserModelMapper = Mapper<UserDTO, User, UserEntity>;
@injectable()
class UserMapper implements UserModelMapper {
  // TODO: Validate with TS types
  validateDto(userDto: UserDTO) {
    const {
      firstName,
      firstSurname,
      email,
    } = userDto;

    if (!firstName) {
      throw new Error('Cannot find firstName on UserDTO');
    }

    if (!firstSurname) {
      throw new Error('Cannot find firstSurname on UserDTO');
    }

    if (!email) {
      throw new Error('Cannot find email on UserDTO');
    }
  }

  // TODO: Validate with TS types
  validateEntity(userEntity: UserEntity) {
    const {
      id,
      firstName,
      firstSurname,
      email,
    } = userEntity;

    if (!id) {
      throw new Error('Cannot find id on UserEntity');
    }

    if (!firstName) {
      throw new Error('Cannot find firstName on UserEntity');
    }

    if (!firstSurname) {
      throw new Error('Cannot find firstSurname on UserEntity');
    }

    if (!email) {
      throw new Error('Cannot find email on UserEntity');
    }
  }

  domainToEntity(user: User): UserEntity {
    const {
      id,
      firstName,
      firstSurname,
      secondSurname,
      email,
    } = user;

    return {
      id,
      firstName,
      firstSurname,
      secondSurname,
      email,
    } as UserEntity;
  }

  dtoToDomain(userDto: UserDTO): User {
    this.validateDto(userDto);

    const {
      id,
      firstName,
      firstSurname,
      secondSurname,
      email,
    } = userDto;

    return new User(
      id,
      firstName,
      firstSurname,
      secondSurname,
      email,
    );
  }

  domainToDto(user: User): UserDTO {
    const {
      id,
      firstName,
      firstSurname,
      secondSurname,
      email,
    } = user;

    return {
      id,
      firstName,
      firstSurname,
      secondSurname,
      email,
    } as UserDTO;
  }

  entityToDomain(userEntity: UserEntity): User {
    const {
      id,
      firstName,
      firstSurname,
      secondSurname,
      email
    } = userEntity;

    return new User(
      id,
      firstName,
      firstSurname,
      secondSurname,
      email
    );
  }
}

export default UserMapper;

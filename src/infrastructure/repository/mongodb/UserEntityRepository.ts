import Repository from '../../../domain/interfaces/Repository';
import UserEntity from '../../../domain/entity/UserEntity';

interface UserEntityRepository extends Repository<UserEntity> {}

export default UserEntityRepository;

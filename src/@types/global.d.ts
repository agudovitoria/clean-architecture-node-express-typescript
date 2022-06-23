type Model = import('mongoose').Model;
type Controller = import('src/domain/interfaces/Controller').default;
type Service = import('src/domain/interfaces/Service').default;
type UserDTO = import('../domain/dto/UserDTO').default;
type UserEntity = import('../domain/entity/UserEntity').default;
type Mapper = import ('../domain/interfaces/Mapper').default;
type User = import('../domain/User').default;

declare global {
  export type UserMapper = Mapper<UserDTO, User, UserEntity>;
  export type UserController = Controller<UserDTO>;
  export type UserService = Service<User>;
  export type UserEntityModel = Model<UserEntity>;
}

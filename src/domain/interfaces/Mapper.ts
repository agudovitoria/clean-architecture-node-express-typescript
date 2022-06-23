interface Mapper <T, S, R> {
  validateDto(dto: T): void;
  validateEntity(entity: R): void;
  domainToEntity(domain: S): R;
  dtoToDomain(dto: T): S;
  domainToDto(domain: S): T;
  entityToDomain(entity: R): S;
}

export default Mapper;

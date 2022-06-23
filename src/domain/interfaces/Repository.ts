interface Repository<T> {
  create(entity: T): Promise<T>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<T>;
  retrieve(): Promise<Array<T>>;
  update(id: string, entity: T): Promise<T>;
}

export default Repository;

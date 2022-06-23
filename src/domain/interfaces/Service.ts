interface Service<T> {
  create(t: T): Promise<T>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<T>;
  retrieve(): Promise<T[]>;
  update(id: string, t: T): Promise<T>;
}

export default Service;

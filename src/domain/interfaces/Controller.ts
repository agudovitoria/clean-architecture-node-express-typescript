interface Controller<T> {
  getAll(): Promise<Array<T>>;
  getById(id: string): Promise<T>;
  create(model: T): Promise<T>;
  update(id: string, t: T): Promise<T>;
  delete(id: string): Promise<T>;
}

export default Controller;

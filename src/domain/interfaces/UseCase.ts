interface UseCase<T> {
  execute(object?: T): Promise<void | T | T[]>;
}

export default UseCase;

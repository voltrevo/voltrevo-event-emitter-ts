export class MapWithDefault<T> {
  private underlyingMap: { [key: string]: T };
  private defaultGenerator: () => T;
  
  constructor(defaultGenerator: () => T) {
    this.defaultGenerator = defaultGenerator;
  }
  
  get(key: string): T {
    return this.underlyingMap[key];
  }
  
  set(key: string, value: T) {
    this.underlyingMap[key] = value;
  }
}
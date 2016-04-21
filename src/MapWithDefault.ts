export class MapWithDefault<T> {
  underlyingMap: { [key: string]: T };
  defaultGenerator: () => T;
  
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
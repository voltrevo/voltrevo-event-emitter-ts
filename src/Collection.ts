interface Wrapper<T> {
  value: T
}

export interface Remover<T> {
  remove(): void;
}

export class Collection<T> {
  private elements: Wrapper<T>[];
  
  add(value: T): Remover<T> {
    const element = {value};
    this.elements.push(element);
    
    return {
      remove(): void {
        element.value = null;
      }
    };
  }

  toArray(): T[] {
    this.elements = this.elements.filter(
      el => el.value !== null
    );
    
    return this.elements.map(el => el.value);
  }
}
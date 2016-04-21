interface Wrapper<T> {
  value: T
}

interface Remover {
  remove(): void;
}

export class Collection<T> {
  elements: Wrapper<T>[];
  
  add(value: T): Remover {
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
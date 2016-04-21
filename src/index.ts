import {Collection, Remover} from './Collection.ts';
import {MapWithDefault} from './MapWithDefault.ts';

type Handler<T> = (value: T) => void;
type Listener<T> = Remover<Handler<T>>;

type AsyncFn = (job: () => void) => void;

export class EventEmitter<T> {
  private events: MapWithDefault<Collection<Handler<T>>>;
  private async: AsyncFn;
  
  constructor(async: AsyncFn = setTimeout) {
    this.events = new MapWithDefault<Collection<Handler<T>>>(
      () => new Collection<Handler<T>>()
    );
    
    this.async = async;
  }
  
  on(evt: string, handler: Handler<T>): Listener<T> {
    return this.events.get(evt).add(handler);
  }
  
  once(evt: string, handler: Handler<T>): Listener<T> {
    const listener = this.events.get(evt).add((value) => {
      listener.remove();
      handler(value);
    });
    
    return listener;
  }
  
  emit(evt: string, value: T): void {
    this.async(() => {
      this.events.get(evt).toArray().forEach((handler) => handler(value));
    });
  }
}
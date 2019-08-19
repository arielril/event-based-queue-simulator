export interface IQueueConfig {
  name: string;
  capacity: number;
  minArrival: number;
  maxArrival: number;
  minService: number;
  maxService: number;
}

export default class Queue<T> {
  _store: T[] = [];
  _capacity: number;
  _name: string;
  _minArrival: number = 0;
  _maxArrival: number = 0;
  _minService: number = 0;
  _maxService: number = 0;

  constructor (config: IQueueConfig) {
    this._name = config.name;
    this._capacity = config.capacity;
    this._minArrival = config.minArrival;
    this._maxArrival = config.maxArrival;
    this._minService = config.minService;
    this._maxService = config.maxService;
  }

  push(val: T): void {
    const one: number = 1;
    if (this.size() + one > this._capacity) {
      throw new Error('Queue is full');
    }
    this._store.push(val);
  }

  get pop(): T | undefined {
    return this._store.shift();
  }

  size(): number {
    return this._store.length;
  }

  get capacity(): number {
    return this._capacity;
  }

  getName(): string {
    return this._name;
  }
}

export interface IQueueConfig {
  name: string;
  capacity: number;
  servers: number;
  minArrival: number;
  maxArrival: number;
  minService: number;
  maxService: number;
}

export default class Queue<T> {
  _store: T[] = [];
  _servers: number;
  _capacity: number;
  _name: string;
  _minArrival: number = 0;
  _maxArrival: number = 0;
  _minService: number = 0;
  _maxService: number = 0;
  _times: number[] = [];
  _online: number = 0;

  constructor (config: IQueueConfig) {
    this._name = config.name;
    this._capacity = config.capacity;
    this._minArrival = config.minArrival;
    this._maxArrival = config.maxArrival;
    this._minService = config.minService;
    this._maxService = config.maxService;
    this._servers = config.servers;
    // tslint:disable-next-line: prefer-array-literal
    this._times = new Array(this._capacity + 1).fill(0);
  }

  push(val: T): void {
    this._store.push(val);
  }

  get pop(): T | undefined {
    return this._store.shift();
  }

  capacity(): number {
    return this._capacity;
  }

  setTime(time: number) {
    this._times[this._online] = Number((this._times[this._online] + time).toFixed(4));
  }
}

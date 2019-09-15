import {
  MinMax,
  IEnvironmentQueue,
  IQueue,
  QueueContext,
  IDestinationQueue,
} from '../types';

export class Queue implements IQueue {
  readonly _name: string;
  readonly _servers: number;
  _capacity: number;
  _arrival: MinMax;
  _service: MinMax;
  _environment: IEnvironmentQueue;
  private _population: number;
  private _destinations: IDestinationQueue[];

  constructor (ctx: QueueContext) {
    this._name = ctx.name;
    this._servers = ctx.servers;
    this._capacity = ctx.capacity;
    this._arrival = ctx.arrival;
    this._service = ctx.service;
    this._environment = ctx.environment;
    // current population of the queue
    this._population = 0;
    this._destinations = [];
  }

  arrival(): void {
    // TODO: compute time of the environment
    if (this._population < this._capacity) {
      this._population += 1;
      if (this._population <= this._servers) {
        // TODO: schedule departure to the environment
      }
    } else {
      // ! lost event
    }
  }

  departure(): void {
    // TODO: Compute time of the environment
    this._population -= 1;
    if (this._population >= this._servers) {
      // TODO: schedule depoarture to the environment
    }
  }
}

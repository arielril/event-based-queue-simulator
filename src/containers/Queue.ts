import * as R from 'ramda';

import {
  MinMax,
} from '../../types';
import { IQueue, QueueContext } from '../../types/Queue';
import { IEnvironment } from '../../types/Environment';
import { IDestination } from '../../types/Destination';

export class Queue implements IQueue {
  readonly _name: string;
  readonly _servers: number;
  _capacity: number;
  _arrival: MinMax;
  _service: MinMax;
  _environment: IEnvironment;
  private _population: number;
  _utilization: number[];
  private _destinations: IDestination[];

  constructor (ctx: QueueContext) {
    this._name = ctx.name;
    this._servers = ctx.servers;
    this._capacity = ctx.capacity || Infinity;
    this._arrival = ctx.arrival;
    this._service = ctx.service;
    this._environment = ctx.environment;
    this._utilization = this._capacity === Infinity
      ? []
      // tslint:disable-next-line: prefer-array-literal
      : new Array(this._capacity + 1).fill(0);
    // current population of the queue
    this._population = 0;

    // List o destinations sorted from the lowest to the highiest probability
    this._destinations = [];
  }

  public updateUtilization(elapsed: number): void {
    if (!this._utilization[this._population]) {
      this._utilization[this._population] = 0;
    }
    this._utilization[this._population] = Number(
      (this._utilization[this._population] + elapsed).toFixed(4),
    );
  }

  /**
   * Get the delay based on min and max values
   * @param param0
   * @param param0.min Min val
   * @param param0.max Max val
   */
  private getDelay({ min, max }: MinMax): number {
    const rnd = this._environment.random();
    return Number(((max - min) * rnd + min).toFixed(4));
  }

  public getName(): string {
    return this._name;
  }

  public arrival(isRedirect: boolean = false): void {
    this._environment.checkTime();
    if (this._population < this._capacity) {
      this._population += 1;
      if (this._population <= this._servers) {
        this._environment
          .scheduleDeparture(
            this,
            this.getDestination(),
          );
      }
    } else {
      // ! lost event
    }

    if (!isRedirect) {
      this._environment.scheduleArrival(this);
    }
  }

  public getArrivalDelay(): number {
    return this.getDelay(this._arrival);
  }

  public departure(): void {
    this._environment.checkTime();
    this._population -= 1;
    if (this._population >= this._servers) {
      this._environment
        .scheduleDeparture(
          this,
          this.getDestination(),
        );
    }
  }

  public getDepartureDelay(): number {
    return this.getDelay(this._service);
  }

  /**
   * Adds a destination to the queue. The result is the destinations
   * list sorted from the lowest to the highest probability
   * @param dst Destination
   */
  public addDestination(dst: IDestination): void {
    const prob = R.prop('_probability');
    const idx: number = R.findLastIndex(
      (lstDst: IDestination) => R.lt(prob(dst), prob(lstDst)),
      this._destinations,
    );
    this._destinations = R.insert(idx, dst, this._destinations);
  }

  public getDestination(): IQueue | undefined {
    // if there is no destination
    if (!this._destinations.length) {
      return;
    }

    // if there is one destination with probability grater than 0
    if (
      this._destinations.length === 1
      && this._destinations[0]._probability > 0
    ) {
      return this._destinations[0]._destinationQueue;
    }

    // find the right destination for the probability
    let rnd = this.getDelay({ min: 0, max: 1 });
    for (const dest of this._destinations) {
      if (rnd <= dest._probability) {
        return dest._destinationQueue;
      }
      rnd -= dest._probability;
    }

    return;
  }
}

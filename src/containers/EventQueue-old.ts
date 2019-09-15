import * as R from 'ramda';
import { MinMax, EventType } from '../types';
import { QueueEvent } from './QueueEvent';

interface IEventQueue {
  name: EventQueueConfig['name'];
  capacity: EventQueueConfig['capacity'];
  servers: EventQueueConfig['servers'];
  arrival: EventQueueConfig['arrival'];
  service: EventQueueConfig['service'];
  random: () => number;
}

interface EventQueueConfig {
  name: string;
  capacity: number;
  servers: number;
  arrival: MinMax;
  service: MinMax;
  random: () => number;
}

export class EventQueue implements IEventQueue {
  private _store: QueueEvent[];
  private _utilization: number[];
  readonly servers: number;
  name: string;
  capacity: number;
  arrival: MinMax;
  service: MinMax;
  random: () => number;

  constructor (config: EventQueueConfig) {
    this.name = config.name;
    this.capacity = config.capacity;
    this.servers = config.servers;
    this.random = config.random;

    // creates a list to store the events
    // the list must have one element more to represent the element 0
    // tslint:disable-next-line: prefer-array-literal
    this._store = new Array(this.capacity + 1);
    // keeps the amount of time in each capacity
    // tslint:disable-next-line: prefer-array-literal
    this._utilization = new Array(this.capacity + 1).fill(0);

    this.arrival = config.arrival;
    this.service = config.service;
  }

  private getEventTime(type: EventType): number {
    let min = 0;
    let max = 0;

    switch (type) {
      case EventType.ARRIVAL:
        ({ min, max } = this.arrival);
        break;
      case EventType.DEPARTURE:
        ({ min, max } = this.service);
        break;
    }

    return (max - min) * this.random() + min;
  }

  private addEvent(type: EventType): void {
    const ev = new QueueEvent({
      type,
      time: this.getEventTime(type),
    });

    const cloneList = R.clone(this._store);
    const insert = R.pipe(
      R.findLastIndex(
        (lEv: QueueEvent) => R.lte(
          R.prop('time', ev),
          R.prop('time', lEv),
        ),
      ),
      R.insert(R.__, ev, cloneList),
    );

    this._store = insert(cloneList);
  }

  addArrival() {
    this.addEvent(EventType.ARRIVAL);
  }

  addDeparture() {
    this.addEvent(EventType.DEPARTURE);
  }

  private setUtilization(timeAmount: number) {
    this._utilization[this.size()] = Number(
      (
        this._utilization[this.size()] + timeAmount
      ).toFixed(4),
    );
  }

  size(): number {
    return this._store.length;
  }

  simulate() {
    const currEv = this._store.shift();

    if (!currEv) {
      return;
    }

    if (currEv.is(EventType.ARRIVAL)) {
      this.setUtilization(currEv.time);

      if (this.size() <= this.servers) {
        this.addDeparture();
      }
      this.addArrival();
    } else if (currEv.is(EventType.DEPARTURE)) {
      this.setUtilization(currEv.time);

      if (this.size() >= this.servers) {
        this.addDeparture();
      }
    }
  }
}

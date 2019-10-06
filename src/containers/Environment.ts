import * as R from 'ramda';
import { random } from '../models/Random';
import {
  IEnvironment,
  EnvironmentContext,
} from '../../types/Environment';
import { IQueueEvent } from '../../types/QueueEvent';
import { IQueue } from '../../types/Queue';
import { ConfigFileSchema } from '../../types/FileParser';
import { QueueEvent, EventType } from './QueueEvent';

/**
 * This is the Environment Queue which manages all the other queues and
 * contains the global time of the simulation.
 */
export class Environment implements IEnvironment {
  eventList: IQueueEvent[];
  random: (() => number);
  time: number;
  lastTime: number;
  private queues: Map<string, IQueue>;
  _rndQty: number;
  private sizeOfSim: number = 100000;

  constructor (ctx: EnvironmentContext) {
    this.eventList = Array.from<QueueEvent>([]);
    this.time = 0;
    this.lastTime = 0;
    this._rndQty = 0;
    this.queues = new Map<string, IQueue>();
    this.random = this.getRandomFunction(ctx.rndNumbers);
  }

  step(): void {
    const ev = this.eventList.shift();

    if (!ev) {
      throw new Error('No more events');
    }

    this.lastTime = this.time;
    this.time = ev.time;

    if (ev.type === EventType.ARRIVAL) {
      ev.sourceQueue.arrival();
    }

    if (ev.type === EventType.DEPARTURE) {
      ev.sourceQueue.departure();
      const destQueue = ev.destinantionQueue;

      if (destQueue) {
        destQueue.arrival(true);
      }
    }
  }

  private getRandomFunction(rndNumbers?: ConfigFileSchema['rndNumbers']): (
    () => number
  ) {
    if (rndNumbers) {
      this.sizeOfSim = rndNumbers.length;
      return () => {
        const val = rndNumbers.shift();

        this._rndQty += 1;

        return val || 0;
      };
    }

    return () => {
      this._rndQty += 1;
      return random();
    };
  }

  private sortEventList(): void {
    const time = R.prop('time');
    const cmp = R.comparator(
      (a: IQueueEvent, b: IQueueEvent) => R.lte(time(a), time(b)),
    );
    this.eventList = R.sort(cmp, this.eventList);
  }

  private addEvent(ev: IQueueEvent): void {
    this.eventList.push(ev);
    this.sortEventList();
  }

  scheduleArrival(queue: IQueue, initTime?: number): void {
    if (this._rndQty + 1 > this.sizeOfSim) {
      throw new Error('End of simulation');
    }
    const delay = initTime || queue.getArrivalDelay();
    const ev: IQueueEvent = new QueueEvent({
      type: EventType.ARRIVAL,
      time: Number((this.time + delay).toFixed(4)),
      sourceQueue: queue,
    });
    this.addEvent(ev);
  }

  scheduleDeparture(srcQueue: IQueue, dstQueue?: IQueue): void {
    if (this._rndQty + 1 > this.sizeOfSim) {
      throw new Error('End of simulation');
    }
    const delay = srcQueue.getDepartureDelay();
    const ev = new QueueEvent({
      type: EventType.DEPARTURE,
      time: Number((this.time + delay).toFixed(4)),
      sourceQueue: srcQueue,
      destinantionQueue: dstQueue,
    });
    this.addEvent(ev);
  }

  addQueue(queue: IQueue): void {
    this.queues.set(queue.getName(), queue);
  }

  getQueue(name: IQueue['_name']): IQueue | undefined {
    return this.queues.get(name);
  }

  checkTime(): void {
    const timeDiff = Number((this.time - this.lastTime).toFixed(4));
    this.queues
      .forEach(val => val.updateUtilization(timeDiff));
    this.lastTime = this.time;
  }

  getResults(): { queue: string; utilization: number[]; }[] {
    const l: { queue: string; utilization: number[]; }[] = [];
    this.queues
      .forEach((val, key) => {
        l.push({
          queue: key,
          utilization: val._utilization,
        });
      });
    return l;
  }
}

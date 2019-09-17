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

  constructor (ctx: EnvironmentContext) {
    this.eventList = Array.from<QueueEvent>([]);
    this.time = 0;
    this.lastTime = 0;
    this.queues = new Map<string, IQueue>();

    this.random = this.getRandomFunction.bind(this)(ctx.rndNumbers);
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
        destQueue.arrival.bind(destQueue)(true);
      }
    }
  }

  private getRandomFunction(rndNumbers?: ConfigFileSchema['rndNumbers']): (
    () => number
  ) {
    if (rndNumbers) {
      return () => rndNumbers.shift() || 0;
    }

    return random;
  }

  private sortEventList(): void {
    const time = R.prop('time');
    const cmp = R.comparator(
      (a: IQueueEvent, b: IQueueEvent) => R.gte(time(a), time(b)),
    );
    this.eventList = R.sort(cmp, this.eventList);
  }

  private addEvent(ev: IQueueEvent): void {
    this.eventList.push(ev);
    this.sortEventList();
  }

  scheduleArrival(queue: IQueue, initTime?: number): void {
    const delay = initTime || queue.getArrivalDelay.bind(queue)();
    const ev: IQueueEvent = new QueueEvent({
      type: EventType.ARRIVAL,
      time: delay,
      sourceQueue: queue,
    });
    this.addEvent(ev);
  }

  scheduleDeparture(srcQueue: IQueue, dstQueue?: IQueue): void {
    const delay = srcQueue.getDepartureDelay.bind(srcQueue)();
    const ev = new QueueEvent({
      type: EventType.DEPARTURE,
      time: delay,
      sourceQueue: srcQueue,
      destinantionQueue: dstQueue,
    });
    this.addEvent(ev);
  }

  addQueue(queue: IQueue): void {
    this.queues.set(queue.getName.bind(queue)(), queue);
  }

  getQueue(name: IQueue['_name']): IQueue | undefined {
    return this.queues.get(name);
  }

  checkTime(): void {
    const timeDiff = this.time - this.lastTime;
    this.queues
      .forEach(val => val.updateUtilization.bind(val)(timeDiff));
    this.lastTime = this.time;
  }
}

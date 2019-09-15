import { IEnvironmentQueue, IQueueEvent } from '../types';

/**
 * This is the Environment Queue which manages all the other queues and
 * contains the global time of the simulation.
 */
export class EnvironmentQueue implements IEnvironmentQueue {
  eventList: IQueueEvent[];
  random: any;
  time: number;
  totalTime: number;

  constructor () {
    this.eventList = [];
    this.time = 0;
    this.totalTime = 0;
  }
}

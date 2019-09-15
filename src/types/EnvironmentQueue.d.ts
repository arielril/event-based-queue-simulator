import { IQueueEvent } from '.';

export interface IEnvironmentQueue {
  eventList: IQueueEvent[];
  random: any;
  time: number;
  totalTime: number;
}

import { IQueue } from './Queue';

export enum EventType {
  ARRIVAL = 'A',
  DEPARTURE = 'D',
}

export interface EventContext {
  type: EventType;
  time: number;
  sourceQueue: IQueue;
  destinantionQueue?: IQueue;
}

export interface IQueueEvent {
  readonly time: EventContext['time'];

  sourceQueue: EventContext['sourceQueue'];
  destinantionQueue?: EventContext['destinantionQueue'];

  /**
   * Validates the type of an event
   * @param type
   */
  is(type: EventType): boolean;
  /**
   * Get the event time
   */
  getTime(): EventContext['time'];
}

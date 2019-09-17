import { IQueue } from './Queue';
import { EventType } from '../src/containers/QueueEvent';

export interface EventContext {
  type: EventType;
  time: number;
  sourceQueue: IQueue;
  destinantionQueue?: IQueue;
}

export interface IQueueEvent {
  readonly time: EventContext['time'];
  readonly type: EventContext['type'];

  sourceQueue: EventContext['sourceQueue'];
  destinantionQueue?: EventContext['destinantionQueue'];

  /**
   * Validates the type of an event
   * @param type
   */
  isType(type: EventType): boolean;
  /**
   * Get the event time
   */
  getTime(): EventContext['time'];
}

export enum EventType {
  ARRIVAL = 'A',
  DEPARTURE = 'D',
}

export interface EventContext {
  type: EventType;
  time: number;
  sourceQueue: IQueueEvent[];
  destinantionQueue: IQueueEvent[];
}

export interface IQueueEvent {
  readonly time: EventContext['time'];

  sourceQueue: EventContext['sourceQueue'];
  destinantionQueue: EventContext['destinantionQueue'];

  is(type: EventType): boolean;
}

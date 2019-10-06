import { IQueueEvent, EventContext } from '../../types/QueueEvent';
import { IQueue } from '../../types/Queue';

export enum EventType {
  ARRIVAL = 'A',
  DEPARTURE = 'D',
}

export class QueueEvent implements IQueueEvent {
  private static ID = 0;
  private _id: number;
  readonly type: EventContext['type'];
  readonly time: EventContext['time'];
  sourceQueue: IQueue;
  destinantionQueue?: IQueue;

  constructor (ctx: EventContext) {
    this._id = this.getId;
    this.type = ctx.type;
    this.time = Number(ctx.time.toFixed(4));
    this.sourceQueue = ctx.sourceQueue;
    this.destinantionQueue = ctx.destinantionQueue;
  }

  private get getId(): number {
    const id = QueueEvent.ID;
    QueueEvent.ID += 1;
    return id;
  }

  isType(type: EventType): boolean {
    return this.type === type;
  }

  getTime(): EventContext['time'] {
    return this.time;
  }
}

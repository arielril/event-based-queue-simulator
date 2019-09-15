import { EventType, IQueueEvent, EventContext, IQueue } from '../../types';

export class QueueEvent implements IQueueEvent {
  private static ID = 0;
  private _id: number;
  private _type: EventContext['type'];
  readonly time: EventContext['time'];
  sourceQueue: IQueue;
  destinantionQueue?: IQueue;

  constructor (ctx: EventContext) {
    this._id = this.getId;
    this._type = ctx.type;
    this.time = ctx.time;
    this.sourceQueue = ctx.sourceQueue;
    this.destinantionQueue = ctx.destinantionQueue;
  }

  private get getId(): number {
    const id = QueueEvent.ID;
    QueueEvent.ID += 1;
    return id;
  }

  is(type: EventType): boolean {
    return this._type === type;
  }

  getTime(): EventContext['time'] {
    return this.time;
  }
}

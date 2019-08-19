export enum QueueEventType {
  'ARRIVAL',
  'EXIT',
}

export interface IQueueEventConfig {
  type: QueueEventType;
  time: number;
}

export default class QueueEvent {
  _type: QueueEventType;
  _time: number;

  constructor (conf: IQueueEventConfig) {
    this._type = conf.type;
    this._time = conf.time;
  }

  getType(): QueueEventType {
    return this._type;
  }

  getTime(): number {
    return this._time;
  }
}

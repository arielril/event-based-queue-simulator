import { QueueEvent } from './QueueEvent';

interface IEventServerConfig {
  name: number;
}

interface IEventServer {
  name: IEventServerConfig['name'];
  currEvent: QueueEvent | null;
}

export class EventServer implements IEventServer {
  name: IEventServerConfig['name'];
  currEvent: QueueEvent | null;

  constructor ({ name }: IEventServerConfig) {
    this.name = name;
    this.currEvent = null;
  }
}

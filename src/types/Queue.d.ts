import { MinMax, IEnvironmentQueue } from '.';

export interface IQueue {
  readonly _name: string;
  readonly _servers: number;
  _capacity: number;
  _arrival: MinMax;
  _service: MinMax;
}

export interface QueueContext {
  name: string;
  servers: number;
  capacity: number;
  arrival: MinMax;
  service: MinMax;
  environment: IEnvironmentQueue;
}

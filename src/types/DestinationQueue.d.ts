import { IQueue } from '.';

export interface IDestinationQueue {
  readonly _probability: number;
  readonly _destinationQueue: IQueue;
}

export interface IDestinationQueueContext {
  probability: number;
  dstQueue: IQueue;
}

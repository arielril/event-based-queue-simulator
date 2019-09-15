import { IQueue } from '.';

export interface IDestination {
  readonly _probability: number;
  readonly _destinationQueue?: IQueue;
}

export interface IDestinationContext {
  probability: number;
  dstQueue: IQueue;
}

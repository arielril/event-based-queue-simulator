import {
  IQueue,
  IDestinationQueueContext,
  IDestinationQueue,
} from '../types';

export class DestinationQueue implements IDestinationQueue {
  readonly _probability: number;
  readonly _destinationQueue: IQueue;

  constructor (ctx: IDestinationQueueContext) {
    this._probability = ctx.probability;
    this._destinationQueue = ctx.dstQueue;
  }
}

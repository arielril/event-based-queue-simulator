import {
  IDestinationContext,
  IDestination,
} from '../../types/Destination';
import { IQueue } from '../../types/Queue';

export class Destination implements IDestination {
  readonly _probability: number;
  readonly _destinationQueue?: IQueue;

  constructor (ctx: IDestinationContext) {
    this._probability = ctx.probability;
    this._destinationQueue = ctx.dstQueue;
  }
}

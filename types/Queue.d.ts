import { MinMax } from './index';
import { IDestination } from './Destination';
import { IEnvironment } from './Environment';

export interface IQueue {
  readonly _name: string;
  readonly _servers: number;
  _capacity: number;
  _arrival: MinMax;
  _service: MinMax;
  _utilization: number[];

  /**
   * Treat an arrival event
   * @param [isRedirect=false] Tells if is an event to redirect to another queue
   */
  arrival(isRedirect?: boolean): void;
  /**
   * Get the arrival delay for and event
   */
  getArrivalDelay(): number;

  /**
   * Treat a departure event
   */
  departure(): void;
  /**
   * Get the departure delay for and event
   */
  getDepartureDelay(): number;

  /**
   * Adds a destination to the queue. The result is the destinations
   * list sorted from the lowest to the highest probability
   * @param dst Destination
   */
  addDestination(dst: IDestination): void;

  /**
   * Get the queue name
   */
  getName(): string;

  /**
   * Update the utilization of the queue
   * @param elapsed Time difference from the actual time and the last check
   */
  updateUtilization(elapsed: number): void;
}

export interface QueueContext {
  name: string;
  servers: number;
  capacity: number;
  arrival: MinMax;
  service: MinMax;
  environment: IEnvironment;
}

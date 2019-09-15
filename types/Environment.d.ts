import { IQueueEvent, IQueue, ConfigFileSchema } from '.';

export interface EnvironmentContext {
  rndNumbers?: ConfigFileSchema['rndNumbers'];
}

export interface IEnvironment {
  eventList: IQueueEvent[];
  random: (() => number);
  time: number;
  lastTime: number;

  step(): void;

  /**
   * Schedule arrival for an event
   * @param queue Source queue
   */
  scheduleArrival(queue: IQueue): void;
  /**
   * Schedule the first event arrival
   * @param queue Source queue
   * @param initTime Time for the first arrival
   */
  scheduleArrival(queue: IQueue, initTime: number): void;
  /**
   * Schedule a departure for an event
   * @param srcQueue Source queue of an event
   */
  scheduleDeparture(srcQueue: IQueue): void;
  /**
   * Schedule a departure for an event and send to another queue
   * @param srcQueue Source queue of an event
   * @param dstQueue Destination queue for an event
   */
  scheduleDeparture(srcQueue: IQueue, dstQueue?: IQueue): void;
  /**
   * Schedule a departure for an event and send to another queue
   * @param srcQueue Source queue of an event
   * @param dstQueue Destination queue for an event
   */
  scheduleDeparture(srcQueue: IQueue, dstQueue: IQueue): void;
  /**
   * Adds a queue inside the environment
   * @param queue
   */
  addQueue(queue: IQueue): void;
  /**
   * Retrieves a queue
   * @param name Queue name
   */
  getQueue(name: IQueue['_name']): IQueue | undefined;
  /**
   * Computes the elapsed time for the entire simulation
   */
  checkTime(): void;
}

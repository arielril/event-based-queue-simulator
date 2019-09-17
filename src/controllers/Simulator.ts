import * as R from 'ramda';
import { parse } from '../models/FileParser';
import { Environment } from '../containers/Environment';
import { IEnvironment } from '../../types/Environment';
import { Queue } from '../containers/Queue';
import { Destination } from '../containers/Destination';
import { ConfigFileSchema } from '../../types/FileParser';

const addQueues = R.curry(
  ({ queues }: ConfigFileSchema, env: IEnvironment): IEnvironment => {
    for (const q of queues) {
      const nQueue = new Queue({
        name: q.name,
        capacity: q.capacity,
        servers: q.servers,
        arrival: q.arrival,
        service: q.service,
        environment: env,
      });
      env.addQueue.bind(env)(nQueue);
    }
    return env;
  },
);

const createNetwork = R.curry(
  ({ network }: ConfigFileSchema, env: IEnvironment): IEnvironment => {
    if (network) {
      for (const net of network) {
        const srcQ = env.getQueue.bind(env)(net.src);
        const dstQ = env.getQueue.bind(env)(net.dst);

        if (srcQ && dstQ) {
          srcQ.addDestination.bind(srcQ)(new Destination({
            dstQueue: dstQ,
            probability: net.probability,
          }));
        }
      }
    }
    return env;
  },
);

const createArrivals = R.curry(
  ({ arrivals }: ConfigFileSchema, env: IEnvironment): IEnvironment => {
    for (const qName in arrivals) {
      const q = env.getQueue.bind(env)(qName);
      if (q) {
        env.scheduleArrival.bind(env)(q, arrivals[qName]);
      }
    }
    return env;
  },
);

function createEnv(config: ConfigFileSchema, useRandom: boolean): IEnvironment {
  const rndNumbers = useRandom ? config.rndNumbers : undefined;
  const env: IEnvironment = new Environment({ rndNumbers });

  return R.pipe(
    addQueues(config),
    createNetwork(config),
    createArrivals(config),
  )(env);
}

/**
 * This is the controller to run the simulation correctelly
 */
export function simulator(...args: string[]): void {
  const [filePath, useRandom] = args;

  const configs = parse({ path: filePath });

  const useRnd = useRandom === 'useRandom';
  const env = createEnv(configs, useRnd);
  let sizeOfSimulation = 100000;

  if (useRnd) {
    sizeOfSimulation = configs.rndNumbers.length;
  }

  while (env.eventList.length && env.time < sizeOfSimulation) {
    console.log('size of simulation', env.time, sizeOfSimulation)
    env.step();
  }
}

import random from './random';
// tslint:disable-next-line: import-name
import Queue, { IQueueConfig } from '../helpers/queue';
import { parse, IFileObject } from '../helpers/parseFile';

function getQueue(parsedFile: IFileObject): Queue<any> {
  const qConf = parsedFile.queues[0];
  const conf: IQueueConfig = {
    name: qConf.name,
    capacity: qConf.capacity,
    minArrival: qConf.arrival.min,
    maxArrival: qConf.arrival.max,
    minService: qConf.service.min,
    maxService: qConf.service.max,
    servers: qConf.servers,
  };
  return new Queue<any>(conf);
}

function fstArrival(file: IFileObject): Ev {
  const [key] = Object.keys(file.arrivals);
  return {
    id: 1,
    scheduledTime: file.arrivals[key],
    // queueName: key,
    type: EvType.ARRIVAL,
  };
}

enum EvType {
  'ARRIVAL',
  'EXIT',
}

interface Ev {
  id: number;
  type: EvType;
  scheduledTime: number;
}

// escalonador
let SCHEDULER: Ev[] = [];
let EV_ID = 2;
let TIME: number = 0;

function sortScheduler() {
  SCHEDULER = SCHEDULER.sort((a, b) => {
    const at = a.scheduledTime;
    const bt = b.scheduledTime;
    if (at < bt) {
      return -1;
    }

    if (at === bt) {
      return 0;
    }

    return 1;
  });
}

function addArrival(rnd: number, min: number, max: number) {
  const val = (max - min) * rnd + min;
  SCHEDULER.push({
    id: EV_ID,
    scheduledTime: Number((TIME + val).toFixed(4)),
    type: EvType.ARRIVAL,
  });
  EV_ID += 1;
  sortScheduler();
}

function addExit(rnd: number, min: number, max: number) {
  const val = (max - min) * rnd + min;
  SCHEDULER.push({
    id: EV_ID,
    scheduledTime: Number((TIME + val).toFixed(4)),
    type: EvType.EXIT,
  });
  EV_ID += 1;
  sortScheduler();
}

export default function simulation(...args: string[]): void {
  const [filePath, useRandom] = args;
  // get object from config file
  const parsedFile: IFileObject = parse({ path: filePath });
  // create a queu with the config
  const Q = getQueue(parsedFile);
  const rndNumbers = parsedFile.rndNumbers;

  let times = 0;
  let sizeOfSimulation = 100000;

  // function to get the random probability and add time
  let getRND = () => { times += 1; return random(); };

  if (useRandom === 'useRandom') {
    // set the random number to the provided from the config file
    sizeOfSimulation = rndNumbers.length;
    getRND = () => { times += 1; return rndNumbers.shift() || 0; };
  }

  // add the first arrival to the scheduler
  SCHEDULER.push(fstArrival(parsedFile));

  while (SCHEDULER.length && times < sizeOfSimulation) {
    // console.log('Scheduler:', JSON.stringify(SCHEDULER))
    const ev = SCHEDULER.shift();

    // console.log('Event:', ev);
    // console.log('Time:', TIME);
    if (!ev) {
      break;
    }

    if (ev.type === EvType.ARRIVAL) {
      Q.setTime(ev.scheduledTime - TIME);
      TIME = ev.scheduledTime;
      Q.push({
        id: EV_ID,
        type: ev.type,
        time: TIME,
      });

      if (Q._online < Q._capacity) {
        Q._online += 1;
        if (Q._online <= Q._servers) {
          addExit(
            getRND() || 0,
            Q._minService,
            Q._maxService,
          );
        }
      }

      addArrival(
        getRND() || 0,
        Q._minArrival,
        Q._maxArrival,
      );
    } else if (ev.type === EvType.EXIT) {
      Q.setTime(ev.scheduledTime - TIME);
      TIME = ev.scheduledTime;
      Q.push({
        id: EV_ID,
        type: ev.type,
        time: TIME,
      });

      Q._online -= 1;
      if (Q._online >= Q._servers) {
        addExit(
          getRND() || 0,
          Q._minService,
          Q._maxService,
        );
      }
    }
    // console.log('----------------\n')
  }

  console.log('Times:', Q._times);
  console.log('Final Time:', TIME);
}

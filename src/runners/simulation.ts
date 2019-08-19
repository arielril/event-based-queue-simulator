import Queue, { IQueueConfig } from '../helpers/queue';
import QueueEvent, { QueueEventType } from '../helpers/event';
import { parse, IFileObject } from '../helpers/parseFile';

let TEMPO = 0;

function getQueue(parsedFile: IFileObject): Queue<any> {
  const qConf = parsedFile.queues[0];
  const conf: IQueueConfig = {
    name: qConf.name,
    capacity: qConf.capacity,
    minArrival: qConf.arrival.min,
    maxArrival: qConf.arrival.max,
    minService: qConf.service.min,
    maxService: qConf.service.max,
  };
  return new Queue<any>(conf);
}

export default function simulation(...args: string[]): void {
  const [filePath] = args;
  const parsedFile: IFileObject = parse({ path: filePath });

  const Q = getQueue(parsedFile);


  const eventList: QueueEvent[] = [];
  eventList.push(new QueueEvent({
    type: QueueEventType.ARRIVAL,
    time: parsedFile.arrivals[Q.getName()],
  }));

  while (true) {
    TEMPO += 1;
    break;
  }
}

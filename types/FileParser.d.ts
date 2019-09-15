import { MinMax } from '.';

interface FileQueues {
  name: string;
  servers: number;
  capacity: number;
  arrival: MinMax;
  service: MinMax;
}

interface FileNetwork {
  src: FileQueues['name'];
  dst: FileQueues['name'];
  probability: number;
}

export interface ConfigFileSchema {
  arrivals: {
    [key: string]: number,
  };
  queues: FileQueues[];
  network?: FileNetwork[];
  rndNumbers: number[];
}

interface ParseConfig {
  path: string;
}

interface ParseConstant {
  ({ path }: ParseConfig): ConfigFileSchema;
}

declare namespace FileParser {
  function check(parsedFile: ConfigFileSchema): ConfigFileSchema;

  const parseJson: ((s: string) => ConfigFileSchema);

  const parse: ParseConstant;
  export { parse };
}

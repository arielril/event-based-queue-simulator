import * as R from 'ramda';
import * as fs from 'fs';
import * as joi from 'joi';

import { schema } from '../constants/fileSchema';

export interface IQueueFileSchema {
  name: string;
  servers: number;
  capacity: number;
  arrival: {
    min: number,
    max: number,
  };
  service: {
    min: number,
    max: number,
  };
}

export interface IFileObject {
  arrivals: {
    [key: string]: number,
  };
  rndNumbers: number[];
  queues: IQueueFileSchema[];
}

export interface Parse {
  (prop: ({ path: string })): IFileObject
}

function checkFile(parsedFile: IFileObject): IFileObject {
  const valid = joi.validate(parsedFile, schema, {
    stripUnknown: true,
    allowUnknown: true,
  });

  if (!valid) {
    throw new Error('Invalid schema for the file');
  }

  return parsedFile;
}

/**
 * Parses a JSON file to an Object
 * @param prop
 * @param prop.path Path to the file
 */
const parse: Parse = R.ifElse(
  R.has('path'),
  R.pipe(
    (o: Object): string => R.propOr('', 'path', o),
    (p: string) => fs.readFileSync(p, 'utf8'),
    R.tryCatch(
      R.pipe(
        JSON.parse,
        checkFile,
      ),
      () => { throw new Error('Failed to parse file to JSON'); },
    )
  ),
  () => { throw new Error('Invalid file path'); }
)

export { parse };

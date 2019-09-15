/// <reference path="../../types/FileParser.d.ts" />
import fs from 'fs';
import * as R from 'ramda';

import { ConfigFileSchema, ParseConstant } from '../../types';
import { fileSchema } from '../constants/fileSchema';

function check(parsedFile: ConfigFileSchema): ConfigFileSchema {
  const valid = fileSchema.validate(parsedFile, {
    stripUnknown: true,
    allowUnknown: true,
  });

  if (!valid) {
    throw new Error('Invalid schema for the config file');
  }

  return parsedFile;
}

const parseJson: ((s: string) => ConfigFileSchema) = R.tryCatch(
  R.pipe(
    JSON.parse,
    check,
  ),
  () => { throw new Error('Failed to parse file to JSON'); },
);

/**
 * Parses a .json file to a Config File Object
 * @param prop
 * @param prop.path Path to the file
 */
const parse: ParseConstant = R.ifElse(
  R.has('path'),
  R.pipe(
    (o: object): string => R.pathOr('', 'path', o),
    (p: string) => fs.readFileSync(p, 'utf8'),
    parseJson,
  ),
  () => { throw new Error('Invalid file path'); },
);

export { parse };

#!/usr/bin/env node
import { random } from './models/Random';
import { simulator } from './controllers/Simulator';

const [, , command, ...args] = process.argv;

switch (command) {
  case 'random':
    console.log('Random:', random());
    break;
  case 'run':
    console.log('Running simulation...');
    simulator(...args);
    break;
  default:
    throw new Error('Invalid command');
}

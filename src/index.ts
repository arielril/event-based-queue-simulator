#!/usr/bin/env node
import random from './runners/random';
import simulation from './runners/simulation';

const [, , command, ...args] = process.argv;

switch (command) {
  case 'random':
    random();
    break;
  case 'run':
    console.log('Running simulation...');
    simulation(...args);
    break;
  default:
    throw new Error('Invalid command');
}

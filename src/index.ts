import { random } from './models/Random';
import { simulator } from './controllers/Simulator';

const [, , command, ...args] = process.argv;

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getRand() {
  const qty = Number(args[0] || '1');
  console.log('[');
  for (let i = 0; i < qty; i += 1) {
    console.log(`${random()},`);
  }
  console.log(']');
}

switch (command) {
  case 'random':
    getRand();
    break;
  case 'run':
    console.log('Running simulation...');
    simulator(...args);
    break;
  default:
    throw new Error('Invalid command');
}

import * as R from 'ramda';

const congruentGenerator = R.curry(
  (max: number, c: number, a: number, seed: number) => {
    let lastVal: number = seed;

    return (): number => {
      lastVal = ((a * lastVal) + c) % max;
      return lastVal;
    };
  },
);

/**
 * Returns a random number generated using the Linear Congruent Method
 */
export function random(): number {
  const MAX = 5000;
  const rnd = congruentGenerator(MAX, 77, 23, Date.now());

  return Number(
    (rnd() / MAX).toFixed(4),
  );
}

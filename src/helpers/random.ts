import * as R from 'ramda';

function rnd(): (
  (max: number, c: number, a: number, seed: number) => (() => number)
) {
  return R.curry(
    (max: number, c: number, a: number, seed: number) => {
      let lastVal: number = seed;

      return () => {
        lastVal = ((a * lastVal) + c) % max;
        return lastVal;
      };
    },
  );
}

export default rnd();

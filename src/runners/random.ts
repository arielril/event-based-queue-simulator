import rnd from "../helpers/random";

export default function random(...args: string[]): void {
  const MAX = 5000;
  const RND = rnd(MAX, 77, 23, Date.now())
  console.log('# X', 'Y')
  for (let i = 0; i < 1000; i += 1)
    console.log(i, RND() / MAX)
}

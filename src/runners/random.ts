import rnd from "../helpers/random";

export default function random() {
  const MAX = 5000;
  const RND = rnd(MAX, 77, 23, Date.now())
  return Number((RND() / MAX).toFixed(5));
  // console.log('# X', 'Y')
  // for (let i = 0; i < 100000; i += 1)
  //   console.log(RND() / MAX)
}

#!/usr/bin/env node
import rnd from "./random";

const MAX = 5000;

const RND = rnd(MAX, 47, 23, Date.now())

console.log('# X', 'Y')
for (let i = 0; i < 1000; i += 1)
  console.log(i, RND() / MAX)

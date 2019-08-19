import { parse } from './src/parseFile'

const x = parse({
  path: './example/file.json'
})
console.log('x', x)

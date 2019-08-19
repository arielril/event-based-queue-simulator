import { parse } from '../helpers/parseFile';

export default function simulation(...args: string[]): void {
  const [filePath] = args;

  console.log('parsed file', parse({ path: filePath }));
}

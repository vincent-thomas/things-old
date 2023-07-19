import { parse } from 'flags';
import { driveRouter } from './drive/mod.ts';

const options = parse(Deno.args);
switch (options._?.[0]) {
  case 'drive':
    driveRouter();
    break;
  default:
    console.error('NO COMMAND MATCHED');
}

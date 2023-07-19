import { parse } from 'flags';
import ping from './ping.ts';
import another from './another.ts';

export const driveRouter = () => {
  const options = parse(Deno.args);
  switch (options._?.[1]) {
    case 'ping':
      ping(options);
      break;
    case 'another':
      another(options);
      break;
  }
};

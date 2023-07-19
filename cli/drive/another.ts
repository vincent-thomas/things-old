import { Args } from 'flags';
import { isHelp } from '../helpers/args.ts';

export default (conf: Args) => {
  console.log(conf);
  console.log(isHelp(conf));
  console.log('another');
};

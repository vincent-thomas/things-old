import { Args } from 'flags';

export const isHelp = (args: Args) => args?.h || args?.help;

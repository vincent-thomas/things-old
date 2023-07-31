/// <reference types="node" />
import { Encoding } from 'crypto';
export declare const fromBuffer: (buffer: Buffer, encoding?: Encoding) => string;
export declare const toBuffer: (text: string, encoding?: Encoding) => Buffer;
export declare const formatTo: (text: string, encodingFrom: Encoding, encodingTo: Encoding) => string;

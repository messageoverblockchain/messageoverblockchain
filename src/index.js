import {encode, compress, decode}  from './encoder.js';
import {toEncodedString, toTxnArray} from './txnConverter.js';

export const encodeData = encode;
export const compressData = compress;
export const decodeData = decode;
export const convertEncodedString = toEncodedString;
export const converttoTxnArray = toTxnArray;

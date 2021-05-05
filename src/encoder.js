import KEYS, { SHIFT_START, SHIFT_END }  from './keys.js';

/**
 * 
 * @param {String} encodedData 
 * @returns 
 */
export function compress(encodedData) {

    let i = 0;
    while(i < encodedData.toString().length) {
        let currentChar = encodedData.toString().slice(i,i+2);
        let nextChar = encodedData.toString().slice(i+2,i+4);

        if(currentChar == SHIFT_END && nextChar == SHIFT_START) { 
            let start = encodedData.toString().slice(0,i);
            let end = encodedData.toString().slice(i+4);
            encodedData = start+end; 
        }
        i+=2;
    }
    return encodedData;
}

/**
 * 
 * @param {String} value 
 * @param {Boolean} compression 
 * @returns 
 */
export function encode(value, compression = true) {
    let encodedValue = '';
    
    for (let i = 0; i < value.length; i++) {
        let currentChar = value.charAt(i);
        let encodedChar = KEYS[currentChar];
        
        encodedValue += 
            encodedChar === undefined ? '' : encodedChar;
    }
    return (compression) ? compress(encodedValue) :  encodedValue;
}

/**
 * 
 * @param {String} data 
 * @returns decoded Plain text from encoded string
 */
export function decode(data) {
    let decodedValue = '';
    let decodeDictionary = getDecodeDictionary(KEYS);

    let i = 0;
    let shift1 = false;
    while(i < data.toString().length) {
        let currentChar = data.toString().slice(i,i+2);
        i+=2;
        if(currentChar === SHIFT_START) { shift1 = true; continue }
        if(currentChar === SHIFT_END) { shift1 = false; continue }
        // console.log('cc', currentChar);
        
        let decodedChar = decodeDictionary[currentChar];
        if(shift1) { decodedChar = decodedChar.toString().toUpperCase(); }
        decodedValue += 
            decodedChar === undefined ? '' : decodedChar;

    }   
    
    return decodedValue;
}

function getDecodeDictionary(dictionary) {
    let decodeDictionary = {};
    
    for (let prop in dictionary) {
        if(dictionary.hasOwnProperty(prop)) {
            decodeDictionary[dictionary[prop]] = prop;
        }
    }
    return decodeDictionary;
}

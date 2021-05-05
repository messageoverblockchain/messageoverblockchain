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
export function encode(value) {
    let encodedValue = '';
    
    let shift1 = false;
    for (let i = 0; i < value.length; i++) {
        let currentChar = value.charAt(i);

        if(shift1 && (isLetter(currentChar) && currentChar !== currentChar.toUpperCase() || !isLetter(currentChar))) {
            encodedValue += SHIFT_END;
            shift1 = false;
        }

        if(!shift1 && isLetter(currentChar) && currentChar == currentChar.toUpperCase()) {
            encodedValue += SHIFT_START;
            shift1 = true;
        } 
        let encodedChar = KEYS[currentChar.toLowerCase()];
        
        encodedValue += 
            encodedChar === undefined ? '' : encodedChar;
  
    }

    if(shift1) { encodedValue += SHIFT_END; }

    return encodedValue;
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

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

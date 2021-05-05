import { SPACE }  from './keys.js';

/**
 * 
 * @param {Array} txns 
 * @returns encoded linear string
 */
export function toEncodedString(txns) {
    let encodedStr = ''
    for (const txn of txns) {
        // msg += decode(Math.floor(txn*100000000000000000))
        encodedStr += txn.toString().slice(3);
    }
    return encodedStr;
}

/**
 * 
 * @param {String} encodedStr 
 * @returns Array of txn
 */
export function toTxnArray(encodedStr, mantissaLength = 16) {
    const reg = new RegExp(`.{1,${mantissaLength}}`,'g')
    let _txns = encodedStr.match(reg);
    
    let pad = SPACE
    for(let i=0; i< mantissaLength; i+=2){
        pad += SPACE;
    }

    let txns = [];
    for (const txn of _txns) {
        let t = ''
        if(txn.length < mantissaLength) {
            t =  (txn + pad).substring(0,mantissaLength)
        } else {
            t = txn;
        }
        txns.push('0.0'+t);
    }
    
    return txns;

}
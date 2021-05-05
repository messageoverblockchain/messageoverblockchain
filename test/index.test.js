import {encodeData, decodeData, compressData, convertEncodedString, converttoTxnArray} from '../src/index.js';

describe('Encoding Tests', () => {

  // -------------------------------------------------------------------------
  // Setup up
  // -------------------------------------------------------------------------

  // let log;
  beforeAll(async (done) => {
    done();
  });

  // -------------------------------------------------------------------------
  // Tear down
  // -------------------------------------------------------------------------

  afterAll(async () => {
  });

  // -------------------------------------------------------------------------
  // Test cases
  // -------------------------------------------------------------------------

  test('Encodes String', async () => {
    expect(encodeData('A')).toStrictEqual('961097');
  });

  test('Decode a String', async () => {
    expect(decodeData('961197')).toStrictEqual('B');
  });

  test('Convert Txn array into String', async() => {
    const txns = [
        '0.07396229796289796',
        '0.01697749873630274',
        '0.09873962897961497',
        '0.09623979613979614',
        '0.09796279774989611',
        '0.09796219796309796',
        '0.01497999614979623',
        '0.09796149796279796',
        '0.01697963497999628',
        '0.09796129796189796',
        '0.01497962397961297',
        '0.09614979996299796',
        '0.01497961297961797',
        '0.09623979624979621',
        '0.09796249796169796',
        '0.03497736996289796',
        '0.01497962397961397',
        '0.09614979627977498',
        '0.07396119796249796',
        '0.01397963497749896',
        '0.01797142121249896',
        '0.03297242721136898',
        '0.07369961197962497',
        '0.09613979634977498',
        '0.07369630274987369',
        '0.09622979628979616',
        '0.09774989999999999',
    ];

    expect(convertEncodedString(txns))
    .toStrictEqual('7396229796289796'+
            '1697749873630274'+
            '9873962897961497'+
            '9623979613979614'+
            '9796279774989611'+
            '9796219796309796'+
            '1497999614979623'+
            '9796149796279796'+
            '1697963497999628'+
            '9796129796189796'+
            '1497962397961297'+
            '9614979996299796'+
            '1497961297961797'+
            '9623979624979621'+
            '9796249796169796'+
            '3497736996289796'+
            '1497962397961397'+
            '9614979627977498'+
            '7396119796249796'+
            '1397963497749896'+
            '1797142121249896'+
            '3297242721136898'+
            '7369961197962497'+
            '9613979634977498'+
            '7369630274987369'+
            '9622979628979616'+
            '9774989999999999')
  })

  test('Compress encoded String', async() => {
    expect(compressData(
            '7396229796289796'+
            '1697749873630274'+
            '9873962897961497'+
            '9623979613979614'+
            '9796279774989611'+
            '9796219796309796'+
            '1497999614979623'+
            '9796149796279796'+
            '1697963497999628'+
            '9796129796189796'+
            '1497962397961297'+
            '9614979996299796'+
            '1497961297961797'+
            '9623979624979621'+
            '9796249796169796'+
            '3497736996289796'+
            '1497962397961397'+
            '9614979627977498'+
            '7396119796249796'+
            '1397963497749896'+
            '1797142121249896'+
            '3297242721136898'+
            '7369961197962497'+
            '9613979634977498'+
            '7369630274987369'+
            '9622979628979616'+
            '9774989999999999'))
    .toStrictEqual('73962228169774987363027498739628142313142797'+
            '749896112130149799961423142716349799962812181423121497'+
            '999629141217232421241634977369962814231314279774987396'+
            '112413349774989617971421212498963297242721136898736996'+ 
            '112413349774987369630274987369962228169774989999999999')
  })

  test('String to txn array', async() => {

    const input = {
        MSG: {
          '-2': { SENDER: 'BLUE ENERGY SCIENCE TECHNOLOGY', BODY: 'Hello, World!' }
        }
      }
    const out_array = [
    '0.07996222816976679',
    '0.06302667996281423',
    '0.01314279766961121',
    '0.03014979996142314',
    '0.02716349799962812',
    '0.01814231214979996',
    '0.02914121723242124',
    '0.01634978896112413',
    '0.03497669617971421',
    '0.02124889996329724',
    '0.02721136880808099'
    ]

    const mantissaLength = 16;
    const arr = converttoTxnArray( encodeData(JSON.stringify(input)), mantissaLength);

    expect(arr).toStrictEqual(out_array);  
      

  })

});
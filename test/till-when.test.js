var expect = require('chai').expect;
var tillwhen = require('../till-when');

describe('parse', () => {
  it('parses full ranges', () => {
    var test = tillwhen.parse('9AM-5PM');
    expect(test.begin).to.equal('9:00 AM');
    expect(test.end).to.equal('5:00 PM');

    test = tillwhen.parse('9:01AM - 5:02pm');
    expect(test.begin).to.equal('9:01 AM');
    expect(test.end).to.equal('5:02 PM');

    test = tillwhen.parse('9:02 am - 5:03 PM');
    expect(test.begin).to.equal('9:02 AM');
    expect(test.end).to.equal('5:03 PM');

    test = tillwhen.parse('9AM to 5PM');
    expect(test.begin).to.equal('9:00 AM');
    expect(test.end).to.equal('5:00 PM');
  });

  it('infers antepost from end time', () => {
    var test = tillwhen.parse('1-3PM');
    expect(test.begin).to.equal('1:00 PM');
    expect(test.end).to.equal('3:00 PM');

    test = tillwhen.parse('2-5P');
    expect(test.begin).to.equal('2:00 PM');
    expect(test.end).to.equal('5:00 PM');

    test = tillwhen.parse('9-2P');
    expect(test.begin).to.equal('9:00 AM');
    expect(test.end).to.equal('2:00 PM');
  });

  it('ignores invalid timestrings', () => {
    var test = tillwhen.parse('all day');
    expect(test.begin).to.equal('');
    expect(test.end).to.equal('');
  });

  it('parses partial timestrings', () => {
    var test = tillwhen.parse('8A');
    expect(test.begin).to.equal('8:00 AM');
    expect(test.end).to.equal('');

    test = tillwhen.parse('to 2pm');
    expect(test.begin).to.equal('');
    expect(test.end).to.equal('2:00 PM');

  });

});

describe('parseAntepost', () => {
  it('parses AM', () => {
    var testM = tillwhen.parseAntepost('4AM');
    expect(testM).to.equal('AM');
    testM = tillwhen.parseAntepost('4:44am');
    expect(testM).to.equal('AM');

    testM = tillwhen.parseAntepost('4A');
    expect(testM).to.equal('AM');
    testM = tillwhen.parseAntepost('4:44a');
    expect(testM).to.equal('AM');
  });

  it('parses PM', () => {
    var testM = tillwhen.parseAntepost('5pm');
    expect(testM).to.equal('PM');
    testM = tillwhen.parseAntepost('5:55PM');
    expect(testM).to.equal('PM');
    testM = tillwhen.parseAntepost('5p');
    expect(testM).to.equal('PM');
    testM = tillwhen.parseAntepost('5:55P');
    expect(testM).to.equal('PM');
  });

  it('recogizes missing antepost', () => {
    var testM = tillwhen.parseAntepost('2:11');
    expect(testM).to.equal('');
    testM = tillwhen.parseAntepost('2');
    expect(testM).to.equal('');
  });

});

describe('parseTime', () => {
  it('parses full times', () => {
    var testT = tillwhen.parseTime('4:32AM');
    expect(testT).to.equal('4:32');
    testT = tillwhen.parseTime('4:32A');
    expect(testT).to.equal('4:32');
    testT = tillwhen.parseTime('4:32');
    expect(testT).to.equal('4:32');
  });

  it('parses single hours', () => {
    var testT = tillwhen.parseTime('4AM');
    expect(testT).to.equal('4:00');
    testT = tillwhen.parseTime('4A');
    expect(testT).to.equal('4:00');
    testT = tillwhen.parseTime('4');
    expect(testT).to.equal('4:00');

  });

});

describe('parseHour', () => {
  it('parses hours', () => {
    var testT = tillwhen.parseHour('4:32AM');
    expect(testT).to.equal('4');
    testT = tillwhen.parseHour('12:32A');
    expect(testT).to.equal('12');
  });
});

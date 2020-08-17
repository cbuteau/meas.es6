import {meas} from '../src/manager.js';

describe('Exercise API', function() {
  beforeAll(function() {
    meas.perf.clr.mark()
    meas.perf.clr.meas()
    meas.enable(false);
  });

  // afterAll(function() {
  //   meas.enable(true);
  // });

  it ('Run loop disabled', function() {
    meas.start('loop');

    var array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
    for ( var i = 0; i < array.length; i++) {
      console.log(array[i]);
    }
    meas.end('loop');
    expect(meas.endnmeas('loop')).toBe(undefined);
    meas.meas('loop');
    var measures = window.performance.getEntriesByType('measure');
    console.log(measures);
    expect(measures.length).toBe(0);
  });
});

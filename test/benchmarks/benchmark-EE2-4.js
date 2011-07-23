var testCase = require('nodeunit').testCase;

module.exports = testCase({

 '100K events with 5 listeners, test with 1.5M emits on EE2 without namespacing': function (test) {
   
    var EventEmitter2 = require('../../lib/eventemitter2').EventEmitter2;
    var emitter = new EventEmitter2;

    var iterations = 100000;
    var len = 10;
    var event = '';

    console.time('EE2_4');
    for (var i = 0; i < len*10; i++) {
      for (var j = 0; j < len; j++){
        for (var k = 0; k < len; k++){
          for (var l = 0; l < len; l++){
            event = [i,j,k,l,i,j,k,l].join('');
            emitter.on(event, function () { test.ok(true,'emit') });
            emitter.on(event, function () { test.ok(true,'emit') });
            emitter.on(event, function () { test.ok(true,'emit') });
            emitter.on(event, function () { test.ok(true,'emit') });
            emitter.on(event, function () { test.ok(true,'emit') });
          }
        }
      }
    }

    while (iterations--) {
      emitter.emit('1163911639');
      emitter.emit('5121251212');
      emitter.emit('9137291372');
    }

    console.timeEnd('EE2_4');
    test.expect(1500000);
    test.done();
  }
});
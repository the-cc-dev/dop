var test = require('tape');
var dop = require('../../dist/nodejs').create();
var dopClient1 = require('../../dist/nodejs').create();
var dopClient2 = require('../../dist/nodejs').create();
var transportName = process.argv[2] || 'local';
var transportListen = require('dop-transports').listen[transportName];
var transportConnect = require('dop-transports').connect[transportName];

dop.env = 'SERVER';
dopClient1.env = 'CLIENT1';
dopClient2.env = 'CLIENT2';

var server = dop.listen({transport:transportListen})
var client1 = dopClient1.connect({transport:transportConnect, listener:server})
var client2 = dopClient2.connect({transport:transportConnect, listener:server})





var objServer = dop.register({
    number:1,
    subobject:{},
    arr:[]
})
dop.onsubscribe(function(){
    return objServer;
})





// // setBroadcastFunction(object, 'namefunction')

// test('BROADCASTING TO CLIENTS', function(t) {

client1.subscribe().into({subobject:{broadcast:function(a,b){return a+b}}})
.then(function(obj) {
    return client2.subscribe().into({subobject:{broadcast:function(a,b){return a*b}}})
})
.then(function(obj) {
    
    // var collector = dop.collect();
    objServer.number = 25;
    objServer.arr = [1,2,3];
    // collector.emitAndDestroy();

//     var promises = objServer.subobject.broadcast(2,5);
//     t.equal(Array.isArray(promises), true, 'Promises is array');
//     t.equal(promises.length, 2, 'Promises are two promises');
//     t.equal(promises[0] instanceof Promise, true, 'First promise is instanceof Promise');
//     Promise.all(promises)
//     .then(function(values){
//         t.equal(values[0], 7, 'First value must be 2+5=7');
//         t.equal(values[0], 7, 'Second value must be 2*5=10');
//         t.end()
//     })
//     // .catch(function(err){
//     //     console.log( err );
//     // })
})
// })


// // More test todo
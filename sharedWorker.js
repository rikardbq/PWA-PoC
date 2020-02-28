onconnect = function(e) {
  var port = e.ports[0];
  console.log(e.ports);
  

  port.onmessage = function(e) {
    var workerResult = 'Result: ' + (e.data[0] + e.data[1] + e.data[2] + e.data[3]);
    port.postMessage(workerResult);
  }
}


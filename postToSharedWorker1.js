if (!!window.SharedWorker) {

  // shared worker example
  var mySharedWorker = new SharedWorker('sharedWorker.js');
  var sharedWorkerButton = document.getElementById("sharedWorkerButton");
  
  sharedWorkerButton.onclick = function() {
    mySharedWorker.port.postMessage([1,2,3,4]);
    console.log('Message posted to shared worker');
  }
  
  mySharedWorker.port.onmessage = function(e) {
    console.log('Message received from shared worker ', e.data);
  }
}
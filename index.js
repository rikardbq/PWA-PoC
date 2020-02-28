// step1, check if service worker is supported
// step2, register the service worker on load (the service worker is just a file containing service worker code)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/sw.js").then(function(registration) {
      // Registration was successful
      console.log("ServiceWorker registration successful with scope: ", registration.scope);
    }, function(err) {
      // registration failed :(
      console.log("ServiceWorker registration failed: ", err);
    });
  });
}

// step1, check if webworker is supported
// step2, spawn dedicated webworker
if (window.Worker) {
  var myWorker = new Worker('dedicatedWorker.js');
  var myWorker2 = new Worker('dedicatedWorker.js');
  var dedicatedWorkerButton = document.getElementById('dedicatedWorkerButton');
  var dedicatedWorkerButtonKiller = document.getElementById('dedicatedWorkerButtonKiller');

  dedicatedWorkerButton.onclick = function() {
    myWorker.postMessage([2, 3]);
    console.log('Message posted to worker');
    myWorker2.postMessage([5, 10]);
    console.log('Message posted to worker2');
  }

  myWorker.onmessage = function(e) {
    console.log('Message received from worker', e.data);
  }

  myWorker2.onmessage = function(e) {
    console.log('Message received from worker2 ', e.data);
  }

  dedicatedWorkerButtonKiller.onclick = function(e) {
    myWorker.terminate();
    myWorker2.terminate();
  }
}

var scanBeep = new Audio('/barcode.wav');
var scannerCamEl = document.getElementsByClassName('scanner-cam')[0];
var App = {
    init: function() {
        var self = this;

        Quagga.init(this.config, function(err) {
            if (err) {
                return self.handleError(err);
            }
            Quagga.start();
        });
    },
    handleError: function(err) {
        console.log(err);
    },
    config: {
        inputStream: {
            target: scannerCamEl,
            type : "LiveStream",
            constraints: {
                width: {min: 640},
                height: {min: 480},
                facingMode: "environment",
                aspectRatio: {min: 1, max: 2}
            }
        },
        locator: {
            patchSize: "medium",
            halfSample: true
        },
        numOfWorkers: 2,
        frequency: 10,
        decoder: {
            readers : [{
                format: "code_128_reader",
                config: {}
            }]
        },
        locate: true
    }
};

App.init();

function scanItem(code) {
  scanBeep.play();
  var el = document.createElement('li');
  el.innerText = code;
  document.getElementsByClassName('codes-list')[0].appendChild(el);
  scannerCamEl.classList.add('scanner-cam--scanned');
}

var debouncedScanner = _.debounce(scanItem, 1000, true);
var styleTimer;

Quagga.onDetected((result) => {
  var code = result.codeResult.code;
    alert(code);
  let password = $("#fp").val();
  alert(password);
  if(password==="12345"){
    //write ajax/axios request
    // Make a request for a user with a given ID
    let data = {code};
    axios.post(`/student`,data)
    .then(function (response) {
        alert(response.data.message);
    })
    .catch(function (error) {
        console.log(error);
    });
}else{
    alert("Password is Incorrect, can't save attendance!!");
}
  
  debouncedScanner(code);
  clearTimeout(styleTimer);

  styleTimer = setTimeout(function() {
    scannerCamEl.classList.remove('scanner-cam--scanned');
  }, 1000);
});
const bwipjs = require('bwip-js');
const Quagga = require('quagga').default
var fs = require('fs');
var PNG = require('pngjs').PNG;
var userData = {
    bcid:        'code128',       // Barcode type
    text:        "17BCE128",      // Text to encode
    scale:       3,               // 3x scaling factor
    height:      10,              // Bar height, in millimeters
    includetext: false,            // Show human-readable text
    textxalign:  'center',        // Always good to set this
};
bwipjs.toBuffer(userData, function (err, png) {
        if (err) {
            // Decide how to handle the error
            // `err` may be a string or Error object
            console.log(err)
        } else {
            // `png` is a Buffer
            // png.length           : PNG file length
            // png.readUInt32BE(16) : PNG image width
            // png.readUInt32BE(20) : PNG image height
            fs.writeFile('in.png',png, (err) => {
                if (err) {
                  throw err;
                }
                fs.createReadStream('in.png')
                .pipe(new PNG({
                    filterType: 4
                }))
                .on('parsed', function() {
            
                    for (var y = 0; y < this.height; y++) {
                        for (var x = 0; x < this.width; x++) {
                            var idx = (this.width * y + x) << 2;
            
                            // invert color
                            this.data[idx] = 255 - this.data[idx];
                            this.data[idx+1] = 255 - this.data[idx+1];
                            this.data[idx+2] = 255 - this.data[idx+2];
            
                            // and reduce opacity
                            this.data[idx+3] = this.data[idx+3] >> 1;
                        }
                    }
                    this.pack().pipe(fs.createWriteStream('out.png'));
                });
              }); 

            }
    });

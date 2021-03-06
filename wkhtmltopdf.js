var os = require('os');
var platform = os.platform();
var wget = require('wget-improved');
var arch = os.arch();
var exec = require('child_process').exec;
var src, output, cmd;

if(platform === 'darwin'){ //OSX
  output = 'wkhtmltopdf.pkg';
  if(arch.indexOf('64') > -1){ //64bit
    src = 'http://download.gna.org/wkhtmltopdf/0.12/0.12.4/wkhtmltox-0.12.4_osx-cocoa-x86-64.pkg';
  } else { //32bit
    src = 'http://download.gna.org/wkhtmltopdf/0.12/0.12.4/wkhtmltox-0.12.4_osx-carbon-i386.pkg';
  }
  cmd = "installer -pkg wkhtmltopdf.pkg -target /";
} else if (platform === 'win32'){ //windows
 // TO DO
} else { //linux
  output = 'wkhtmltopdf.tar.xz';
  if(arch.indexOf('64') > -1){ //64bit
    src = 'http://download.gna.org/wkhtmltopdf/0.12/0.12.4/wkhtmltox-0.12.4_linux-generic-amd64.tar.xz';
  } else { //32bit
    src = 'http://download.gna.org/wkhtmltopdf/0.12/0.12.4/wkhtmltox-0.12.4_linux-generic-i386.tar.xz';
  }
  cmd = "tar -xvf wkhtmltopdf.tar.xz && cp ./wkhtmltox/bin/wkhtmlto* /usr/bin && cp ./wkhtmltox/bin/wkhtmlto* /usr/local/bin";
}

var download = wget.download(src, output, {});
download.on('error', function(err) {
    console.log(err);
});
download.on('end', function(output) {
  exec(cmd, function(error, stdout, stderr){
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log('wkhtmltopdf Successfully installed');
  });
});

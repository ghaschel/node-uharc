const child_process = require('child_process');
var asdf;

try {
    asdf = child_process.spawn('/bin/bash', [__dirname + '/scripts/linux-call-uha.sh', '&']);
    // asdf.stderr.pipe(process.stderr);
    asdf.stdout.pipe(process.stdout);
    asdf.stdin.pipe(process.stdin);
  } catch (ex) {
      console.log(ex);
    asdf = ex.stdout;
  }

  //console.log(asdf);

// child_process.execSync('wine', ['./bin/uharc.exe', 'a', '-d2', '-m3', '-md32768', '-mm+', '-y+', './u.uha', './bin/*.exe']).on('exit', function(code, signal) {
//     console.log(code);
//     console.log(signal);
// }).on('error', function(code, signal) {
//     console.log(code);
//     console.log(signal);
// });
// child_process.execSync('./scripts/linux-call-uha.sh');
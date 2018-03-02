// windows
const { spawn } = require('child_process');
  // const child = spawn('./bin/uharc.exe', ['a', '-d2', '-m3', '-md32768', '-mm+', '-y+', 'u.uha', './bin/*.exe']);
 
  // child.stdout.setEncoding('utf8');
  // child.stdout.on('data', (chunk) => {
  //   console.log(chunk)
  //   // data from standard output is here as buffers
  // });
  
  // // since these are streams, you can pipe them elsewhere
  // child.stderr.pipe(process.stderr);
  
  // child.on('close', (code) => {
  //   console.log(`child process exited with code ${code}`);
  // });

  //mac
  const child = spawn('/usr/local/Cellar/wine/3.0/bin/wine', [__dirname + '/bin/uharc.exe', 'a', '-d2', '-m3', '-md32768', '-mm+', '-y+', 'u.uha', __dirname + '/bin/*.exe'], {stdio: ['inherit', 'pipe', 'pipe']});
  // const child = spawn('./scripts/mac-call-uha.sh', [__dirname], {detached: true, stdio: ['ignore', out, err]});
  // const child = spawn('open', [__dirname + '/scripts/call.command'], {detached: true, stdio: ['ignore', out, err]});
  var stdOut = [];
    var stdErr = [];

    child.stdout.on('data', (data) => {
      stdOut.push(data.toString('utf8'));
    });

    child.stderr.on('data', (data) => {
      stdErr.push(data.toString('utf8'));
    });

    child.on('close', () => {
      if (stdErr.length) {
        return;
      }});
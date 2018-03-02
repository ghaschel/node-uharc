  const { spawn } = require('child_process');
  const child = spawn('./bin/uharc.exe', ['a', '-d2', '-m3', '-md32768', '-mm+', '-y+', 'u.uha', './bin/*.exe']);
 
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (chunk) => {
    console.log(chunk)
    // data from standard output is here as buffers
  });
  
  // since these are streams, you can pipe them elsewhere
  child.stderr.pipe(process.stderr);
  
  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

const { exec } = require('child_process');
const path = require('path');

function ejecutarMatlab(funcionMatlab, args = []) {
  const scriptPath = path.join(__dirname, '..', 'matlab');
  function serializeArg(arg) {
  if (Array.isArray(arg)) {
      if (Array.isArray(arg[0])) {
        // matriz
        return `[` + arg.map(row => row.join(' ')).join('; ') + `]`;
      } else {
        // vector
        return `[${arg.join(' ')}]`;
      }
      } else if (typeof arg === 'string') {
      return `'${arg}'`;
      }
      return arg;
  }
  const argsString = args.map(serializeArg).join(', ');
  const comando = `matlab -batch "cd('${scriptPath}'); r = ejecutar('${funcionMatlab}', ${argsString}); disp(r);"`;  

  return new Promise((resolve, reject) => {
    exec(comando, (error, stdout, stderr) => {
      if (error) return reject(error);
      const resultado = stdout.trim().split('\n').pop();
      resolve(resultado);
    });
  });
}

module.exports = { ejecutarMatlab };

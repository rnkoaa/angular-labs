const {
  promisify
} = require('util');

const fs = require('fs');
const readFileAsync = promisify(fs.readFile); // (A)

const readFile = (path, opts = 'utf8') =>
  new Promise((res, rej) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) rej(err);
      else res(data);
    })
  })

const writeFile = (path, data, opts = 'utf8') =>
  new Promise((res, rej) => {
    fs.writeFile(path, data, opts, (err) => {
      if (err) rej(err);
      else res();
    });
  });

module.exports = {
  readFile,
  writeFile
};

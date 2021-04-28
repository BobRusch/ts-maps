#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function updateCSP(filename) {
  fs.readFile(`${filename}`, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    const result = data.replace(/<@API_URLS@>/g, `https://myapi.com`);
    console.log(result);
    fs.writeFile(`${filename}`, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}

function findHTMLFiles(dir, files) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      findHTMLFiles(fullPath, files);
    } else if (file === 'index.html') {
      files.push(fullPath);
    }
  });
}

let htmlFiles = [];
findHTMLFiles('./', htmlFiles);

for (const file of htmlFiles) {
  updateCSP(`./${file}`);
}

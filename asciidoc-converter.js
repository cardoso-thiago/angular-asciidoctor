const Asciidoctor = require('asciidoctor');
const HTMLDecoderEncoder = require("html-encoder-decoder");
const fs = require('fs');
const path = require('path');

const asciidoctor = Asciidoctor();
const rootfolder = './src/app';
const adocext = '.adoc';
const htmlext = '.html';
const separator = '/';

function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), []);
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isDirectory());
}

function getDirectoriesRecursive(srcpath) {
  return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];
}

function convertAsciidocToHtml(file) {
  console.log(file);
  fs.readFile(file, 'utf8', (err, data) => {
    var html = asciidoctor.convert(data);
    html = HTMLDecoderEncoder.decode(html);
    htmlFile = file.replace(adocext, htmlext);

    fs.writeFile(htmlFile, html, { flag: 'w' }, err => {
        if (err) {
          console.error(err);
        }
    });

    if (err) {
      console.error(err);
      return;
    }
});
}

// Obtém todos os diretórios de forma recursiva
const dirs = getDirectoriesRecursive(rootfolder);

// Obtém todos os arquivos .adoc e faz a conversão
dirs.forEach(dir => {
  fs.readdir(dir, function (err, files) {
    if (err) {
        return console.log(err);
    } 
    
    files.forEach(function (file) {
        if(path.extname(file) === adocext) {
          convertAsciidocToHtml(dir + separator + file);
        }
    });
  });
});

var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var express = require('express');

const PORT = 3000;

var app = express();
var files = fs.readdirSync('./drive');

app.get('/test', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  return res.end();
});

app.post('/fileupload', (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath = './drive/' + files.filetoupload.name;
    // console.log(files);
    fs.copyFile(oldpath, newpath, function (err) {
      if (err) throw err;
      res.send('File uploaded and moved!');
      res.end();
    });
  });
});

app.listen(PORT, () => {
  console.log('Listening to port ' + PORT);
});
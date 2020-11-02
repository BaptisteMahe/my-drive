let formidable = require('formidable');
let fs = require('fs');
let express = require('express');

const PORT = 3000;

let app = express();

app.get('/test', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  return res.end();
});

app.post('/fileUpload', (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let oldpath = files.filetoupload.path;
    let newpath = './drive/' + files.filetoupload.name;
    fs.copyFile(oldpath, newpath, function (err) {
      if (err) throw err;
      res.redirect('back');
      res.end();
    });
  });
});

app.get('/allFiles', (req, res) => {
  let files = fs.readdirSync('./drive');
  res.send(files);
});

app.listen(PORT, () => {
  console.log('Listening to port ' + PORT);
});
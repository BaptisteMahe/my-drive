let formidable = require('formidable');
let fs = require('fs');
let express = require('express');
const { dirname } = require('path');

const PORT = 3000;

let app = express();

//CORS Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/fileArray', (req, res) => {
  let files = fs.readdirSync('./drive');
  res.send(files);
});

app.get('/fileDownload', (req, res) => {
  res.download(__dirname + '/drive/' + req.query.fileName, req.query.fileName, error => {
    if (error) throw error;
  });
});

app.delete('/fileDelete', (req, res) => {
  console.log('delete ' + req.query.fileName);
  fs.unlink(__dirname + '/drive/' + req.query.fileName, error => {
    if (error) throw error;
    res.end();
  });
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

app.get('/test', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  return res.end();
});


app.listen(PORT, (error) => {
  if (error) throw error;
  else console.log('Listening to port ' + PORT);
});
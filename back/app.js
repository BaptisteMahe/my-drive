let formidable = require('formidable');
let fs = require('fs');
let express = require('express');

let app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Error middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/fileArray', (req, res) => {
  let files = fs.readdirSync('./drive');
  res.send(files);
});

app.get('/fileDownload', (req, res) => {
  res.download('./drive/' + req.query.fileName, req.query.fileName, error => {
    if (error) throw error;
  });
});

app.delete('/fileDelete', (req, res) => {
  fs.unlink('./drive/' + req.query.fileName, error => {
    if (error) throw error;
    res.end();
  });
});

app.post('/fileUpload', (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    Object.keys(files).forEach((key) => {
      let oldpath = files[key].path;
      let newpath = './drive/' + files[key].name;
      fs.copyFileSync(oldpath, newpath);
    });
    res.end();
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

module.exports = app;
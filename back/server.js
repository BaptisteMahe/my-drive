const app = require('./app');

const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) throw error;
  else console.log('Listening to port ' + PORT);
});
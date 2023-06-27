const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
// const fs = require('fs');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(function responseLogger(req, res, next) {
  const originalSendFunc = res.send.bind(res);
  res.send = function(body) {
    console.log(body);    // do whatever here
    return originalSendFunc(body);
  };
  next();
});
app.use(clog); // add cLog to show me what's happening and why it's not working. Hopefully.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
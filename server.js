const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));






app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/world', (req, res) => {
  res.send([{search : req.body.search}])
})

app.post('/api/world', (req, res) => {

  post = req.body.search
//SQL to find it in 
  console.log(history);
  res.send(
    `I received your POST request. This is what you sent me: ${history}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));



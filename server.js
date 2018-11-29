const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pgp = require('pg-promise')();
const connectionString = "postgres://ejcanooraouhfw:45768f405d9d461797aa22982144e2cd8adcee24df5340ad63971c188e9ae98f@ec2-54-235-133-42.compute-1.amazonaws.com:5432/d4v8mmdbophies?ssl=true"
const db= pgp(connectionString);
const port = process.env.PORT || 5000;
const bcrypt = require('bcrypt');
const saltRounds = 10;





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/search', (req, res) => {

  let post = req.body.search
//SQL to find it in
  db.any('INSERT INTO history (search) VALUES ($1)', [post])
  res.send(
    `I received your POST request. This is what you sent me: ${post}`,
  );
});



app.post('/api/register', (req, res) => {


  console.log(username)

  app.none('SELECT username FROM users WHERE username = $1', [username]).then(() => {
    bcrypt.hash(password, saltRounds).then(hash => {

      app.any('INSERT INTO users (username,firstname,lastname,email,password) VALUES ($1,$2,$3,$4,$5)', [username, firstname, lastname, email, hash])
      }).then(user => {
        res.redirect('/' + user.username + 'home');
      }).catch(e => {

      if (e.name === 'QueryResultError') {
        res.redirect('..');
      } else {
        console.log(e);    
      }
    })
  })
})

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/world', (req, res) => {
  res.send([{search : req.body.search}])
})

app.get('/:username/api/my-books', (req, res) => {
  db.all('SELECT * FROM books WHERE users.username = $1')
})










app.listen(port, () => console.log(`Listening on port ${port}`));

















const makeitup = () => {
  db.none('CREATE TABLE users(id SERIAL PRIMARY KEY NOT NULL, username VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)').catch(e => {
    console.log(e)
  })
}


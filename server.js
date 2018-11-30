const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pgp = require('pg-promise')();
const connectionString = "postgres://ejcanooraouhfw:45768f405d9d461797aa22982144e2cd8adcee24df5340ad63971c188e9ae98f@ec2-54-235-133-42.compute-1.amazonaws.com:5432/d4v8mmdbophies?ssl=true"
const db= pgp(connectionString);
const port = process.env.PORT || 5000;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authenticate = (req, res, next) => {
	let authorizationHeader = req.headers["authorization"]
	
	if (!authorizationHeader) {
		res.status(400).json({error : 'Authroization failed'})
		return
	}

	const token = authorizationHeader.split(' ')[1]

	jwt.verify(token, 'somereallylongsecretkeytomakesureourauthenticatestuffisawesome', (error, decoded) => {

		if (decoded) {
			let username = decoded.username

			db.one("SELECT username FROM users WHERE username = $1", [username]).then(user => {

				return user.username === username
		})
			if (username) {
				next()
			} else {
				res.status(400).json({error: 'Nope'})
			}
		}
	})
}








app.post('/api/register', (req, res) => {

	let username = req.body.username;
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let email = req.body.email;
	let password = req.body.password;

	db.none('SELECT username FROM users WHERE username = $1', [username]).then(() => {
		bcrypt.hash(password, saltRounds).then(hash => {

		db.any('INSERT INTO users (username,firstname,lastname,email,password) VALUES ($1,$2,$3,$4,$5)', [username, firstname, lastname, email, hash])
		}).then(user => {
			res.json({success : true, message : 'You registered!'});
		}).catch(e => {
			if (e.name === 'QueryResultError') {
				res.redirect('..');
			} else {
				console.log(e);    
			}
		})
	})
})


app.post('/api/login', (req, res) => {

	let username = req.body.username
	let password = req.body.password
	console.log('user login here')
	db.one('SELECT username, id, password FROM users WHERE username = $1', [username]).then(user => {
		bcrypt.compare(password, user.password).then(result => {
			if (result) {
				const token = jwt.sign({username : user.username}, 'somereallylongsecretkeytomakesureourauthenticatestuffisawesome')

				res.json({token : token})
			} else {
				res.json({success: false, message: 'Password is incorrect'})
			}
			
		});
	})
})










app.post('/api/search', (req, res) => {

	let post = req.body.search
	//SQL to find it in
	db.any('INSERT INTO history (search) VALUES ($1)', [post])
	res.send(
		`I received your POST request. This is what you sent me: ${post}`,
	);
});








app.get('/api/my-books',authenticate, (req, res) => {

	let username = 'steve';

	db.any('SELECT books.title FROM books').then(books => {
		res.json({books : books})
	})
	
	// db.all('SELECT books.*, users.id, users.username FROM books INNER JOIN users WHERE users.username = $1', [username]).then(result => {
	// 	console.log(result)
	// 	res.json({books : result});
	// })
})



















app.get('/api/hello', (req, res) => {
  	res.send({ express: 'Hello From Express' });
});

app.get('/api/world', (req, res) => {
  	res.send([{search : req.body.search}])
})








app.listen(port, () => console.log(`Listening on port ${port}`));

















const makeitup = () => {
  db.none('CREATE TABLE users(id SERIAL PRIMARY KEY NOT NULL, username VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)').catch(e => {
    console.log(e)
  })
}


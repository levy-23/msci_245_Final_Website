import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/getMovies', (req, res) => {
	const connection = mysql.createConnection(config);
  
	const sql = 'SELECT * FROM dleren.movies';
	connection.query(sql, (error, results) => {
	  if (error) {
		console.error(error.message);
		res.status(500).send('Error fetching movies');
		return;
	  }
	  res.json(results);
	});
  
	connection.end();
  });

  app.post('/api/getWatchlist', (req, res) => {
	const connection = mysql.createConnection(config);
  
	const sql = 'SELECT * FROM dleren.Watchlist';
	connection.query(sql, (error, results) => {
	  if (error) {
		console.error(error.message);
		res.status(500).send('Error fetching movies');
		return;
	  }
	  res.json(results);
	});
  
	connection.end();
  });

  app.post('/api/getSearchedMovies', (req, res) => {
	let title = req.body.searchTitle;
	let director = req.body.searchDirector;
	let actor = req.body.searchActor
	console.log("title: " + title);
	//let title = "Alien";
	const connection = mysql.createConnection(config);
  
	//const sql = 'SELECT M.name AS movie, GROUP_CONCAT(DISTINCT CONCAT(D.first_name,\' \',D.last_name)) AS Director_Name, GROUP_CONCAT(DISTINCT RW.reviewContent) AS Review_Content, AVG(RW.reviewScore) AS Average_Rating FROM dleren.movies M LEFT OUTER JOIN dleren.movies_directors MD ON M.id = MD.movie_id LEFT OUTER JOIN dleren.roles R ON R.movie_id = M.id LEFT OUTER JOIN dleren.Review RW ON RW.movieID = M.id, dleren.directors D, dleren.actors A WHERE MD.director_id = D.id AND R.actor_id = A.id AND M.name = \'' + title + '\' GROUP BY M.name ';
	//const sql = 'SELECT * FROM dleren.movies WHERE name = \'' + title + '\'';
	//const sql = 'SELECT movie, Director_Name, Review_Content, Average_Rating FROM (SELECT M.name AS movie, GROUP_CONCAT(DISTINCT CONCAT(D.first_name,\' \',D.last_name)) AS Director_Name, GROUP_CONCAT(DISTINCT CONCAT(A.first_name,\' \',A.last_name)) AS Actor_Name,GROUP_CONCAT(DISTINCT RW.reviewContent) AS Review_Content, AVG(RW.reviewScore) AS Average_Rating FROM dleren.movies M LEFT OUTER JOIN dleren.movies_directors MD ON M.id = MD.movie_id LEFT OUTER JOIN dleren.roles R ON R.movie_id = M.id LEFT OUTER JOIN dleren.Review RW ON RW.movieID = M.id, dleren.directors D, dleren.actors A WHERE MD.director_id = D.id AND R.actor_id = A.id GROUP BY M.name ) AS t WHERE movie LIKE \'%' + title + '%\' AND Director_Name LIKE \'%' + director + '%\' AND Actor_Name LIKE \'%' + actor + '%\'';
	const sql = 'SELECT movie, Director_Name, Review_Content, Average_Rating FROM (SELECT movie, GROUP_CONCAT(DISTINCT Director_Names )AS Director_Name, GROUP_CONCAT(DISTINCT Actor_Names )AS Actor_Name, Review_Content, Average_Rating FROM (SELECT M.name AS movie, CONCAT(D.first_name,\' \',D.last_name) AS Director_Names, CONCAT(A.first_name,\' \',A.last_name) AS Actor_Names,GROUP_CONCAT(DISTINCT RW.reviewContent) AS Review_Content, AVG(RW.reviewScore) AS Average_Rating FROM dleren.movies M LEFT OUTER JOIN dleren.movies_directors MD ON M.id = MD.movie_id LEFT OUTER JOIN dleren.roles R ON R.movie_id = M.id LEFT OUTER JOIN dleren.Review RW ON RW.movieID = M.id, dleren.directors D, dleren.actors A WHERE MD.director_id = D.id AND R.actor_id = A.id GROUP BY M.name, D.id, A.id) AS rain GROUP BY movie, Review_Content, Average_Rating Having Director_Name LIKE \'%' + director + '%\' AND Actor_Name LIKE \'%' + actor + '%\') AS t WHERE movie LIKE \'%' + title + '%\'';
	connection.query(sql, (error, results) => {
	  if (error) {
		console.error("error in api: " + error.message);
		res.status(500).send('Error fetching movies');
		return;
	  }
	  console.log("results in api: " + results);
	  console.log(results);
	  res.json(results);
	});
  
	connection.end();
  });


app.post('/api/addReview', (req, res) => {

	

	let reviewTitle = req.body.reviewTitle
	let reviewContent = req.body.reviewContent
	let reviewScore = req.body.reviewScore
	let userID = req.body.userId
	let movieID = req.body.movieId
  
	const connection = mysql.createConnection(config);
  
	let sql = `INSERT INTO Review (reviewTitle, reviewContent, reviewScore, userID, movieID) VALUES (?, ?, ?, ?, ?)`;
	let values = [reviewTitle, reviewContent, reviewScore, userID, movieID];

	console.log(values)
  
	
	connection.query(sql, values, (error, results) => {
		if (error) {
		console.error('Error executing SQL query:', error);
		return;
		}
		let string = JSON.stringify(results)
		res.send({express : string})
	});

	connection.end();
	  
  });

  app.post('/api/addWatchlist', (req, res) => {

	let watchByDate = req.body.watchByDate
	let movieName = req.body.movieName
	let userID = req.body.userId
	let movieID = req.body.movieId
  
	const connection = mysql.createConnection(config);
  
	let sql = `INSERT INTO Watchlist (watchByDate, movieName, userID, movieID) VALUES (?, ?, ?, ?)`;
	let values = [watchByDate, movieName, userID, movieID];

	console.log(values)
  
	
	connection.query(sql, values, (error, results) => {
		if (error) {
		console.error('Error executing SQL query:', error);
		return;
		}
		let string = JSON.stringify(results)
		res.send({express : string})
	});

	connection.end();
	  
  });

  app.post('/api/removeWatchlist', (req, res) => {

	let watchID = req.body.watchlistID

  
	const connection = mysql.createConnection(config);
  
	let sql = 'DELETE FROM Watchlist WHERE watchlistID = \'' + watchID + '\'';
	let values = [watchID];

	console.log(values)
  
	
	connection.query(sql, values, (error, results) => {
		if (error) {
		console.error('Error executing SQL query:', error);
		return;
		}
		let string = JSON.stringify(results)
		res.send({express : string})
	});

	connection.end();
	  
  });
  
  

app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
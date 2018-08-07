// MQTT-MySQL-Restful   : An Open Source Project
// Author               : Zuhry Fayesz
// Project Repositories : https://github.com/zuhryfayesz/MQTT-RESTFul-NodeJS.git


// Import required Node dependencies and modules
var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var mqtt = require('mqtt');

// Initialize the MySQL database connectivity
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'qstone',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




// Default index route URL for the API
app.get('/', function (req, res) {

	var data = {
		"Data": ""
	};
	data["Data"] = "Welcome db";
	res.json(data);

});


// API call to list down all available books
app.get('/user', function (req, res) {

	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from user", function (err, rows, fields) {
		if (rows && rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No user Found..';
			res.json(data);
		}
	});

});


// API call to get a specific book detials
app.get('/user/:id', function (req, res) {
	var Id = req.params.id;
	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from user WHERE userNo=?", [Id], function (err, rows, fields) {
		if (rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No user Found in this id ... ';
			res.json(data);
		}
	});
});





// API call to UPDATE an existing book
app.post('/user', function (req, res) {

	var chunk = '';

	//데이터를 가져옵니다.
	req.on('data', function (data) {
		//데이터를 JSON으로 파싱합니다.
		chunk = JSON.parse(data);
	});

	req.on('end', function () {
		//파싱된 데이터를 확인합니다.
		console.log("name : " + chunk.name + " , phone : " + chunk.phone);
		var Bookname = req.body.bookname;
		var Authorname = req.body.authorname;
		var Price = req.body.price;
	});

	

	var da = {
		"error": 1,
		"messege": ""
	};

	if (!!Bookname && !!Authorname && !!Price) {
		connection.query("INSERT INTO book VALUES('',?,?,?)", [Bookname, Authorname, Price], function (err, rows, fields) {
			if (!!err) {
				da["messege"] = "querry error";
			} else {
				da["error"] = 0;
				da["messege"] = "Book Added Successfully";
			}
			res.json(data);
		});
	} else {
		da["messege"] = "data is oh my god";
		res.json(data);
	}


	// 아래의 OK라는 내용이 안드로이드의 ReadBuffer를 통해
	// result String으로 바뀝니다.

	res.write("OK");
	res.end();

});



// Start and initialize the node server on local host port 8080
http.listen(8000, function () {
	console.log("Connected & Listen to port 8000");
});

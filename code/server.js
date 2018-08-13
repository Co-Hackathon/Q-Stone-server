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

		var userName = chunk.userName;
		var userGender = chunk.userGender;
		var userId = chunk.userId;
		var userPw = chunk.userPw;

	});

	

	var da = {
		"error": 1,
		"messege": ""
	};

	if (!!userName && !!userGender && !!userId && !!userPw) {
		connection.query("INSERT INTO user VALUES('',?,?,?,?)", [userName, userGender, userId, userPw], function (err, rows, fields) {
			if (!!err) {
				da["messege"] = "querry error";
			} else {
				da["error"] = 0;
				da["messege"] = "data Added Successfully";
			}
			res.json(da);
		});
	} else {
		da["messege"] = "data is oh my god";
		res.json(da);
	}


	// 아래의 OK라는 내용이 안드로이드의 ReadBuffer를 통해
	// result String으로 바뀝니다.

	res.end();

});




app.get('/userLogin/:id/:pw', function (req, res) {

	var userId = req.params.id;
	var userPw = req.params.pw;
	console.log(userId);
	console.log(userPw);
	

	if (!!userId && !!userPw) {
		connection.query("select * from user where userId = ? and userPw = ?", [userId, userPw], function (err, rows, fields) {
			if (!!err) {
				console.log(err);
				console.log("err");
				res.status(400);
			} else {
				if (rows && rows.length != 0) {
					console.log("success");
					res.status(400);
				} else {
					console.log("fail");
					res.status(200);
				}
				
			}
		});
	} else {

	}


	// 아래의 OK라는 내용이 안드로이드의 ReadBuffer를 통해
	// result String으로 바뀝니다.

	res.write("OK");
	res.end();

});



// API call to list down all available books
app.get('/orderlist', function (req, res) {

	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from orderlist", function (err, rows, fields) {
		if (rows && rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No orderlist Found..';
			res.json(data);
		}
	});

});


// API call to get a specific book detials
app.get('/orderlist/:id', function (req, res) {
	var Id = req.params.id;
	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from orderlist WHERE orderNo=?", [Id], function (err, rows, fields) {
		if (rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No orderlist Found in this id ... ';
			res.json(data);
		}
	});
});


// API call to get a specific book detials
app.get('/orderlistTime/:userNo/:time', function (req, res) {
	var userNo = req.params.userNo;
	var time = req.params.time;

	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from orderlist WHERE userNo = ? and orderDate = ?", [userNo,time], function (err, rows, fields) {
		if (rows && rows.length != 0) {

			res.json(rows);
		} else {
			res.status(204)
			res.end();
		}
	});
});

// API call to UPDATE an existing book
app.post('/orderlist', function (req, res) {

	var chunk = '';

	//데이터를 가져옵니다.
	req.on('data', function (data) {
		//데이터를 JSON으로 파싱합니다.
		chunk = JSON.parse(data);
	});

	req.on('end', function () {
		//파싱된 데이터를 확인합니다.

		var userName = chunk.userName;
		var menuNo = chunk.menuNo;
		var orderCount = chunk.orderCount;
		var orderDate = chunk.orderDate;
		var orderStateNo = chunk.orderStateNo;
	});

	

	var da = {
		"error": 1,
		"messege": ""
	};

	if (!!userName && !!menuNo && !!orderCount && !!orderDate && !!orderStateNo) {
		connection.query("INSERT INTO orderlist VALUES('0',?,?,?,?,?)", [userName, menuNo, orderCount, orderDate, orderStateNo], function (err, rows, fields) {
			if (!!err) {
				da["messege"] = "querry error";
			} else {
				da["error"] = 0;
				da["messege"] = "data Added Successfully";
			}
			res.json(da);
		});
	} else {
		da["messege"] = "data is oh my god";
		res.json(da);
	}


	// 아래의 OK라는 내용이 안드로이드의 ReadBuffer를 통해
	// result String으로 바뀝니다.

	res.write("OK");
	res.end();

});





// API call to list down all available books
app.get('/menu', function (req, res) {

	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from menu", function (err, rows, fields) {
		if (rows && rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No menu Found..';
			res.json(data);
		}
	});

});


// API call to get a specific book detials
app.get('/menu/:id', function (req, res) {
	var Id = req.params.id;
	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from menu WHERE menuNo=?", [Id], function (err, rows, fields) {
		if (rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No menu Found in this id ... ';
			res.json(data);
		}
	});
});

//메뉴하자-------------------------------------------------------------------------
// API call to UPDATE an existing book
app.post('/menu', function (req, res) {

	var chunk = '';

	//데이터를 가져옵니다.
	req.on('data', function (data) {
		//데이터를 JSON으로 파싱합니다.
		chunk = JSON.parse(data);
	});

	req.on('end', function () {
		//파싱된 데이터를 확인합니다.

		var marketNo = chunk.marketNo;
		var menuName = chunk.menuName;
		var menuPrice = chunk.menuPrice;
		var menuURL = chunk.menuURL;

	});

	

	var da = {
		"error": 1,
		"messege": ""
	};

	if (!!marketNo && !!menuName && !!menuPrice && !!menuURL) {
		connection.query("INSERT INTO menu VALUES('0',?,?,?,?)", [marketNo, menuName, menuPrice, menuURL], function (err, rows, fields) {
			if (!!err) {
				da["messege"] = "querry error";
			} else {
				da["error"] = 0;
				da["messege"] = "data Added Successfully";
			}
			res.json(da);
		});
	} else {
		da["messege"] = "data is oh my god";
		res.json(da);
	}


	// 아래의 OK라는 내용이 안드로이드의 ReadBuffer를 통해
	// result String으로 바뀝니다.

	res.write("OK");
	res.end();

});








// API call to list down all available books
app.get('/section', function (req, res) {

	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from section", function (err, rows, fields) {
		if (rows && rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No section Found..';
			res.json(data);
		}
	});

});


// API call to get a specific book detials
app.get('/section/:id', function (req, res) {
	var Id = req.params.id;
	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from section WHERE sectionNo=?", [Id], function (err, rows, fields) {
		if (rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No section Found in this id ... ';
			res.json(data);
		}
	});
});

//메뉴하자-------------------------------------------------------------------------
// API call to UPDATE an existing book
app.post('/section', function (req, res) {

	var chunk = '';

	//데이터를 가져옵니다.
	req.on('data', function (data) {
		//데이터를 JSON으로 파싱합니다.
		chunk = JSON.parse(data);
	});

	req.on('end', function () {
		//파싱된 데이터를 확인합니다.

		var sectionName = chunk.sectionName;
		var menuNo = chunk.menuNo;

	});

	

	var da = {
		"error": 1,
		"messege": ""
	};

	if (!!sectionName && !!menuNo ) {
		connection.query("INSERT INTO section VALUES('0',?,?,?,?,?)", [sectionName, menuNo], function (err, rows, fields) {
			if (!!err) {
				da["messege"] = "querry error";
			} else {
				da["error"] = 0;
				da["messege"] = "data Added Successfully";
			}
			res.json(da);
		});
	} else {
		da["messege"] = "data is oh my god";
		res.json(da);
	}


	// 아래의 OK라는 내용이 안드로이드의 ReadBuffer를 통해
	// result String으로 바뀝니다.

	res.write("OK");
	res.end();

});





// API call to list down all available books
app.get('/market', function (req, res) {

	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from market", function (err, rows, fields) {
		if (rows && rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No market Found..';
			res.json(data);
		}
	});

});


// API call to get a specific book detials
app.get('/market/:id', function (req, res) {
	var Id = req.params.id;
	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from market WHERE marketNo=?", [Id], function (err, rows, fields) {
		if (rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No market Found in this id ... ';
			res.json(data);
		}
	});
});

//메뉴하자-------------------------------------------------------------------------
// API call to UPDATE an existing book
app.post('/market', function (req, res) {

	var chunk = '';

	//데이터를 가져옵니다.
	req.on('data', function (data) {
		//데이터를 JSON으로 파싱합니다.
		chunk = JSON.parse(data);
	});

	req.on('end', function () {
		//파싱된 데이터를 확인합니다.

		var marketBecon = chunk.marketBecon;
		var marketBeName = chunk.marketBeName;
		var marketName = chunk.marketName;
		var marketX = chunk.marketX;
		var marketY = chunk.marketY;
		var categoryNo = chunk.categoryNo;
		var marketURL = chunk.marketURL;
		var marketTime = chunk.marketTime;
		var marketPhone = chunk.marketPhone;
		var marketAddress = chunk.marketAddress;
		var marketBeMa = chunk.marketBeMa;
		var marketBeMi = chunk.marketBeMi;
	});

	

	var da = {
		"error": 1,
		"messege": ""
	};

	if (!!marketBecon && !!marketBeName && !!marketName && !!marketX && !!marketY && !!categoryNo && !!marketURL && !!marketTime && !!marketPhone && !!marketAddress && !!marketBeMa && !!marketBeMi) {
		connection.query("INSERT INTO market VALUES('0',?,?,?,?,?,?,?,?,?,?,?,?)", [marketBecon, marketBeName, marketName, marketX, marketY, categoryNo, marketURL,marketTime,marketPhone,marketAddress,marketBeMa,marketBeMi], function (err, rows, fields) {
			if (!!err) {
				da["messege"] = "querry error";
			} else {
				da["error"] = 0;
				da["messege"] = "data Added Successfully";
			}
			res.json(da);
		});
	} else {
		da["messege"] = "data is oh my god";
		res.json(da);
	}


	// 아래의 OK라는 내용이 안드로이드의 ReadBuffer를 통해
	// result String으로 바뀝니다.

	res.write("OK");
	res.end();

});



// API call to get a specific book detials
app.get('/marketBecon/:id/:major/:minor', function (req, res) {
	var id = req.params.id;
	var major = req.params.major;
	var minor = req.params.minor;

	console.log(id);
	console.log(major);
	console.log(minor);


	var data = {
		"error": 1,
		"messege": ""
	};

	if (!!id && !!major && !!minor) {
		connection.query("select * from market where marketBecon = ? and marketBeMa = ? and marketBeMi = ?", [id, major,minor], function (err, rows, fields) {
			if (!!err) {
				console.log(err);
				console.log("err");
				res.status(204);
				res.end();
			} else {
				if (rows && rows.length != 0) {
					console.log("success");
					res.json(rows);
				} else {
					console.log("fail");
					data["messege"] = 'No data Found..';
					res.status(204);
					res.end();
				}
				
			}
		});
	} else {

	}


	// 아래의 OK라는 내용이 안드로이드의 ReadBuffer를 통해
	// result String으로 바뀝니다.


});



// API call to list down all available books
app.get('/orderState', function (req, res) {

	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from orderState", function (err, rows, fields) {
		if (rows && rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No orderState Found..';
			res.json(data);
		}
	});

});


// API call to get a specific book detials
app.get('/orderState/:id', function (req, res) {
	var Id = req.params.id;
	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from orderState WHERE orderStateNo=?", [Id], function (err, rows, fields) {
		if (rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No orderState Found in this id ... ';
			res.json(data);
		}
	});
});




// API call to list down all available books
app.get('/category', function (req, res) {

	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from category", function (err, rows, fields) {
		if (rows && rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No category Found..';
			res.json(data);
		}
	});

});


// API call to get a specific book detials
app.get('/category/:id', function (req, res) {
	var Id = req.params.id;
	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from category WHERE categoryNo=?", [Id], function (err, rows, fields) {
		if (rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No category Found in this id ... ';
			res.json(data);
		}
	});
});


// API call to get a specific book detials
app.get('/marketMenu/:id', function (req, res) {
	var Id = req.params.id;
	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from menu WHERE marketNo=?", [Id], function (err, rows, fields) {
		if (rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No category Found in this id ... ';
			res.json(data);
		}
	});
});


app.get('/menuSection/:id', function (req, res) {
	var Id = req.params.id;
	var data = {
		"error": 1,
		"messege": ""
	};

	connection.query("SELECT * from section WHERE menuNo=?", [Id], function (err, rows, fields) {
		if (rows.length != 0) {

			res.json(rows);
		} else {
			data["messege"] = 'No category Found in this id ... ';
			res.json(data);
		}
	});
});


// Start and initialize the node server on local host port 8080
http.listen(8000, function () {
	console.log("Connected & Listen to port 8000");
});

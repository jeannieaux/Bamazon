var mysql = require ('mysql');
var inquirer = require ('inquirer');

var connection = mysql.createConnection ({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "@Ltruism7!",
	database: "Bamazon"
})

connection.connect (function(err){
	console.log ("You're connected!");
	start();
})

var start = function () {
	   connection.query("SELECT * FROM products", 
	   	function(err,res){
	   		console.log (res);
	   		inquirer.prompt({
	   			name:"choice",
	   			type: "rawlist",
	   			choices: function(value){
	   				var choiceArray = [];
	   				for (var i = 0; i<res.length; i++){
	   			choiceArray.push (res[i].ProductName);

	   		} return choiceArray;
	   	}, 

	   	        message: "Which product ID will you select?"
	   			}).then (function (answer){

	   			})
	   		})
	}
	   				





	   
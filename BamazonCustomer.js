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
	//console.log ("You're connected!");
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

	   	        message: "Which product would you like to select?"
	   			}).then (function (answer){

	   		       	for (var i = 0; i < res.length; i++){
	   					if (res[i].ProductName == answer.choice){
	   						var chosenItem = res[i];
	   						inquirer.prompt({
	   							name:"selection",
	   							type:"input",
	   							message: "How many units would you like?",
	   							validate: function(value){
	   								if(isNAN(value) == false){
	   									return true;

	   								} else {
	   									return false;
	   								}

	   							}


	   						}).then (function (answer){
	   							if (chosenItem.StockQuantity < parseInt(answer.selection)){
	   								connection.query("UPDATE products SET ? WHERE ? ", [{
	   									StockQuantity: StockQuantity - answer.choice
	   								}], function (err, res){
	   									console.log("Your purchase has been placed!");
	   									start ();
	   								});
	   							} else{
	   								console.log("Insufficient Quantity!");
	   								start();
	   							}
                              })
	   					}
	   				}
	   			})
	   		})
	}

	   									




	  
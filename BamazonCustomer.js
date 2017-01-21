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
	   								if(isNaN(value) == false){
	   									return true;

	   								} else {
	   									//console.log(" Please enter a number.")
	   									return false;
	   								}	
	   							}
// The code malfunctions after this line. I cannot get the user's input to match up to the quantity in the database and perform the 
//appropriate calculations. I want to update the 'StockQuantity' field by subtracting the 'number' the user inputs from the actual quantity
// in the database. Then use this number and multiply the cost to get the total cost. I think I need to do the connection.query first, 
// before I place the if statement; however, I need the condition before I perform any operations. This is the error I get. My StockQuantity 
//field is not defined.  ?????

//Which product would you like to select? Shorts
//? How many units would you like? 7
//(node:4576) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): ReferenceError: StockQuantity is not defined


	   						}).then (function (answer){
	   							if (chosenItem.StockQuantity > parseInt(answer.selection)){
	   								connection.query("UPDATE products SET ? WHERE ?", [{
	   									StockQuantity: StockQuantity - answer.selection
	   								}], function (err, res){
	   									console.log ("Your purchase has been placed. Your total cost is:  " + answer.selection * product.price);
	   								start();
	   								});
	   					
	   						} else{
	   								console.log ("Insufficient quantities left in our inventory.");
	   								start();
	   							}
	                        })                                            
                      }
	                }
	            })
	   		})

	}
//require all necessary modules
const fs = require("fs");
const pug = require("pug");
const uuidv4 = require("uuid/v4");
const express = require("express");
const app = express();

//Set up the repetitive responses
function send404(response){
	response.statusCode = 404;
	response.write("Unknwn resource.");
	response.end();
}

//object to store items
let id = 3;
let items = {
	1: { id: 1, name: "Example Item 1", price: 3.5, quantity: 5 }, 
	2: { id: 2, name: "Example Item 2", price: 5, quantity: 2 }
};


//set template engine
app.set("view engine", "pug");

//static server
app.use(express.static("public"));
app.use("/items/", express.static("public"));
//body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//GET request handlers
app.get("/", function(req, res, next){
	res.render("pages/home");
});
app.get("/items", function(req, res, next){
	//make array of item IDs
	let array = [];
	for(let key in items){
		array.push(items[key].id);
	}
	res.format({
		"text/html" : () => {res.render("pages/items", {items});} , 
		"application/json" : () => {res.status(200).json({items:array});}
	});
})
app.get("/additem", function(req, res, next){
	res.render("pages/additem");
});
app.get("/items/:itemID", function (req, res, next) {
	res.format({
		"text/html": () => { res.render("pages/item", { item: items[req.params.itemID] }); },
		"application/json": () => { res.status(200).json(items[req.params.itemID]); }
	});
});

//POST request handlers
app.post("/items", function(req, res, next){
	//send empty response if required fields are not there
	if(req.body.name == "" || req.body.price == null || req.body.quantity == null){
		res.end();
		return;
	}
	//complete the new item object and send to client
	let newItem = req.body;
	newItem.id = id++;
	items[newItem.id] = newItem;
	res.status(200).send(JSON.stringify(newItem));
});

//PUT request handlers
app.put("/items/:itemID", function(req, res, next){
	//if item id doesn't exist, send 404
	if(!items.hasOwnProperty(req.params.itemID)) send404(res);
	//update item data
	items[req.params.itemID] = req.body;
	res.status(200).end();
});

//DELETE request handlers
app.delete("/items/:itemID", function (req, res, next) {
	//if item id doesn't exist, send 404
	if (!items.hasOwnProperty(req.params.itemID)) send404(res);
	//delete item data
	delete items[req.params.itemID];
	res.status(200).end();
});

//start server
app.listen(3000);
console.log("Server listening at http://localhost:3000");
var express = require('express');
var app = express();

var axios = require("axios");

app.set("view engine", "ejs");

//movie data
app.get("/results", function(req, res){

// Make a request for a user with a given ID
axios.get('http://www.omdbapi.com/?i=tt0109830&apikey=thewdb')
  .then(function (response) {
    // handle success
    console.log("Movie: " + response.data.Title);    
    var data = response.data.Title;
    res.render('results', {data: data});
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });    
})

app.get('/', function(req, res){
  res.render('search');
});

app.get("/movies", function(req, res){

//get the search input with the name=search
var query = req.query.search;
console.log("INPUT: " + query);

// Make a request with a dynamic url inserting users input = query
axios.get('http://www.omdbapi.com/?s=' + query+ '&apikey=thewdb')
  .then(function (response) {
    // handle success
    console.log("Movie: " + response.data.Search[1].Title);    
    var searchres = response.data.Search;
    res.render("movies", {data: {searchres: searchres, query: query} });    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });    
})

app.listen(3000, function(req, res){
    console.log("Server has started!");
});
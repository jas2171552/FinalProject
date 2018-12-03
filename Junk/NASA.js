/*  JavaScript 6th Edition
    Final Project

    Author: Jason Richmond
    Date:   12/02/2018

    Filename: NASA.js
*/

"use strict";  // intereperet contents in JavaScript strict mode

// declare golabal variables
var NASAdata;
var image = document.getElementsByClassName("NASApic");
var imageURL;
var userSelect = 0;

// run setUpPage() function when page finishes loading
window.addEventListener("load", setUpPage, false);


// perform setup tasks when page first loads - load  initial data response from NASA for current date's picture
function setUpPage() {
   	   getNASA();
}

function getNASA() {

	// Create a request variable and assign a new XMLHttpRequest object to it.
	var request = new XMLHttpRequest();
	var yesterdayDate = getYesterdaysDate();	
	
	var userSelect = 1;
	
	// Open a new connection, using the GET request on the URL endpoint
	request.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=2sl7rmOrAKCKBZXOZfH6he3ZIN8OnEamcZzEKPXh', true);
	request.responseType = 'json';
	request.send();
	
	request.onload = function () {

		// Begin accessing JSON data here
		NASAdata = request.response;
		//image.src = NASAdata.url;	
		imageURL = NASAdata.url;
		document.getElementById("NASA-pic").src = NASAdata.url
		document.getElementById("title").innerHTML = NASAdata.title;		
		document.getElementById("date").innerHTML = NASAdata.date;		
		document.getElementById("explanation").innerHTML = NASAdata.explanation;		
		document.getElementById("copyright").innerHTML = NASAdata.copyright;		
		document.getElementById("url").innerHTML = NASAdata.url;	
	}
	var btn = document.getElementById("yestPic");
	btn.innerHTML = 'Show Yesterdays Picture'
}


function getYesterdaysDate() {
    var date = new Date();
    date.setDate(date.getDate()-1);
    return date.getFullYear() + '-' + (date.getMonth()+1)  + '-' + date.getDate();
}


function getNASAyesterday() {

	// Create a request variable and assign a new XMLHttpRequest object to it.
	var request = new XMLHttpRequest();
	
	// Create a variable for the previous day's date.  This is used in the URL sent to NASA for the new picture and data
	var yesterdayDate = getYesterdaysDate();	//'2018-12-01';//
	
	// Open a new connection, using the GET request on the URL endpoint
	request.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=2sl7rmOrAKCKBZXOZfH6he3ZIN8OnEamcZzEKPXh&date=' + yesterdayDate, true);
	request.responseType = 'json';
	request.send();
	
	// Parse response from NASA and populate fields on the Demonstration.html page
	request.onload = function () {

		// Begin accessing JSON data here
		NASAdata = request.response;
		imageURL = NASAdata.url;
		document.getElementById("NASA-pic").src = NASAdata.url
		document.getElementById("title").innerHTML = NASAdata.title;		
		document.getElementById("date").innerHTML = NASAdata.date;		
		document.getElementById("explanation").innerHTML = NASAdata.explanation;		
		document.getElementById("copyright").innerHTML = NASAdata.copyright;		
		document.getElementById("url").innerHTML = NASAdata.url;				
	}

	
}

// Refresh data if user clicks button to see previous NASA image
document.getElementById("yestPic").addEventListener("click",getNASAyesterday,false);

// Refresh data if user clicks button to see previous NASA image
document.getElementById("todayPic").addEventListener("click",getNASA,false);


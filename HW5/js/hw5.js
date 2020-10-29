/*
File: /~amccombs/hw5/js/hw5.js
GUI 1 Assignment: Intro to JS
Allan Z. McCombs, UMass Lowell Computer Science, allan_mccombs@student.uml.edu
Copyright (c) 2020 by Allan Z McCombs. All rights reserved. May be
freely
copied or excerpted for educational purposes with credit to the
author.
updated by AZM on October 29, 2020 at 7:16pm
*/

function create_Table(){

  /* getting var values from html forms */
  var row_mini = Number(document.getElementById('row_min').value);
  var row_maxi = Number(document.getElementById('row_max').value);
  var col_mini = Number(document.getElementById('col_min').value);
  var col_maxi = Number(document.getElementById('col_max').value);

  // Check to see if the numbers are read correctly. Required by assignment
  console.log("Row start: ", row_mini, "Row end: ", row_maxi, "Col start: ", col_mini, "Col end: ", col_maxi);

  //If the user inputs a max < min or min > max, swap them

  if(row_mini > row_maxi){
    var temp = row_mini;
    row_mini = row_maxi;
    row_maxi = temp;
  }

  if(col_mini > col_maxi){
    var temp = col_mini;
    col_mini = col_maxi;
    col_maxi = temp;
  }

  //Minimum is -50 < x < 50
  if (row_mini < -100){
    row_mini = -100;
  }
  if (row_maxi > 100){
    row_maxi = 100;
  }
  if (col_mini < -100){
    col_mini = -100;
  }
  if (col_maxi > 100){
    col_maxi = 100;
  }

  //using a matrix called table to store numbers.
  //need to store the input numbers so the calculation doesn't affect them
  var table = {};
  var row_s = row_mini;
  var col_s = col_mini;

  //Calculate the distance between the numbers for the # of indices
  var rows = row_maxi - row_mini;
  var columns = col_maxi - col_mini;

  for(var i = 0; i <= columns; i++){
    var temp = [];

    for(var j = 0; j <= rows; j++){
      var result = row_s * col_s;
      temp[j] = result;
      row_s++;
    }

    table[i] = temp; //Store our computed values
    row_s = row_mini; //reset the row start
    col_s++; //advance to the next column
  }

  fill_Table(table);
  return 0;
}

function fill_Table(table){

  console.log("Table after computing:\n", table);

  // need a lot of stuff first ------ //

  // getting var values from html forms
  var row_mini = Number(document.getElementById('row_min').value);
  var row_maxi = Number(document.getElementById('row_max').value);
  var col_mini = Number(document.getElementById('col_min').value);
  var col_maxi = Number(document.getElementById('col_max').value);

  // Check to see if the numbers are read correctly. Required by assignment
  console.log("Row start: ", row_mini, "Row end: ", row_maxi, "Col start: ", col_mini, "Col end: ", col_maxi);

  //If the user inputs a max < min or min > max, swap them

  if(row_mini > row_maxi){
    var temp = row_mini;
    row_mini = row_maxi;
    row_maxi = temp;
  }

  if(col_mini > col_maxi){
    var temp = col_mini;
    col_mini = col_maxi;
    col_maxi = temp;
  }

  var row_s = row_mini;
  var col_s = col_mini;

  //Calculate the distance between the numbers for the # of indices
  var rows = row_maxi - row_mini;
  var columns = col_maxi - col_mini;

  //------//

  //opening table from html into var finished table
  var fin_table = "";

  fin_table += "<table>";

  //first row, empty space in top left
  fin_table += "<tr><td></td>";

  //filling first row with user inputted values
  for(var i = row_mini; i <= row_maxi; i++) {
    fin_table += "<td>" + i + "</td>";
  }

  //closing first row
  fin_table += "</tr>";

  //left most column
  var lm_col = col_mini;

  for(var i = 0; i <= columns; i++){
    //setting left most spot firt
    fin_table += "<tr><td>" + lm_col + "</td>";

    for(var j = 0; j <= rows; j++){
      fin_table += "<td>" + table[i][j] + "</td>";
    }

    //increment to the next left most column
    lm_col++;

    //ends each row
    fin_table += "</tr>";
  }

//closing the table tag
fin_table += "</table>"

//Filled Table, checking for table tags
console.log("Table after filling:\n", fin_table);

//loading the finished table into the html
//https://www.w3schools.com/js/js_htmldom_document.asp for innerHTML help
document.getElementById("Multiplication_table").innerHTML = fin_table;

}

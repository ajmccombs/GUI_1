/*
File: /~amccombs/hw7/js/hw7.js
GUI 1 Assignment: jQuery UI Slider and Tab Widgets
Allan Z. McCombs, UMass Lowell Computer Science, allan_mccombs@student.uml.edu
Copyright (c) 2020 by Allan Z McCombs. All rights reserved. May be
freely
copied or excerpted for educational purposes with credit to the
author.
updated by AZM November 25, 2020 at 9:49pm
*/



function update_table() {
  // If the form is valid
  if( $("form#ask_form").valid() == true ) {
    // Then submit to update the table
    $("form#ask_form").submit();
  }
}

/* help from https://jqueryui.com/tabs/#manipulation */
function save_tab(){

  var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
      numOfTabs = 1, //keep track of total current tabs
      tabIndex = 1; //keep track of total save tabs, for tab id sake


  // submit button opens dialog
  $( "#submit" )
      .on("click", function() {
        if(numOfTabs > 10){
          return;
        }
        add_tab(tabTemplate, tabIndex);
        console.log("Number of current tabs:" + numOfTabs);
        console.log("Number of created tabs:" + tabIndex);
        numOfTabs++;
        tabIndex++;
      });

  // table delete in the tabs
  $("#tab").on("click", "span.ui-icon-close", function() {
      var tabId = $(this).closest("li").remove().attr("aria-controls");
      $("#" + tabId).remove();
      $("#tabs").tabs("refresh");
      numOfTabs--;
  });

}

// creates a tab. takes ipnut of tab template and # of current tabs
function add_tab(tabTemplate, tabIndex){

  //initialize tab
  $("#tab").tabs();

  // getting var values from html forms
  var row_mini = Number(document.getElementById('row_min').value);
  var row_maxi = Number(document.getElementById('row_max').value);
  var col_mini = Number(document.getElementById('col_min').value);
  var col_maxi = Number(document.getElementById('col_max').value);

  var label = "Table " + row_mini + " to " + row_maxi + " by " + col_mini + " to " + col_maxi,
      id = "tab-" + tabIndex,
      li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) );
  $("#tab").find(".ui-tabs-nav").append(li);
  $("#tab").append("<div id='" + id + "'>" + $("#Multiplication_table").html() + "</div>");

  // refresh tabs
  $("#tab").tabs("refresh");

  return;
}

function slider(){
  /* Video help: https://www.youtube.com/watch?v=dh_3j_v8USU&ab_channel=JREAM */
  /* used https://jqueryui.com/slider/#hotelrooms for additional help */

  //row min slider
  $("#row_min_slider").slider({
    min: -50, //setting boundaries for slider
    max: 50,
    slide: function(event, ui) { //checks to see if the slider is being updated
      $("#row_min").val(ui.value); //updates form field
      update_table(); //Dynamically updates the table
    }
  });
  $("#row_min").change(function() { //checks to see if form field is being updated
    $("#row_min_slider").slider("value", this.value); //updates slider value
    update_table();
  });

  //row max slider
  $("#row_max_slider").slider({
    min: -50,
    max: 50,
    slide: function(event, ui) {
      $("#row_max").val(ui.value);
      update_table();
    }
  });
  $("#row_max").on("change", function() {
    $("#row_max_slider").slider("value", this.value);
    update_table();
  });

  //col min slider
  $("#col_min_slider").slider({
    min: -50,
    max: 50,
    slide: function(event, ui) {
      $("#col_min").val(ui.value);
      update_table();
    }
  });
  $("#col_min").on("change", function() {
    $("#col_min_slider").slider("value", this.value);
    update_table();
  });

  //col max slider
  $("#col_max_slider").slider({
    min: -50,
    max: 50,
    slide: function(event, ui) {
      $("#col_max").val(ui.value);
      update_table();
    }
  });
  $("#col_max").on("change", function() {
    $("#col_max_slider").slider("value", this.value);
    update_table();
  });

}

function validate_Form(){

  $("#ask_form").validate({
    // rules for the form validations
    rules: {
      row_min: {
      number: true,
      min: -50,
      max: 50,
      required: true
      },
      row_max: {
        number: true,
        min: -50,
        max: 50,
        required: true
      },
      col_min: {
        number: true,
        min: -50,
        max: 50,
        required: true
      },
      col_max: {
        number: true,
        min: -50,
        max: 50,
        required: true
      }
  },

  // messages for invalid inputs
  messages: {
    row_min: {
      number: "Please enter a valid number between -50 and 50 for the Row Min.",
      min: "Please enter a number greater than, or equal to, -50 for the Row Min.",
      max: "Please enter a number smaller than, or equal to, 50 for the Row Min.",
      required: "A number for Row Min is required. Please enter a number between -50 and 50."
    },
    row_max: {
      number: "Please enter a valid number between -50 and 50 for the Row Max.",
      min: "Please enter a number greater than, or equal to, -50 for the Row Max.",
      max: "Please enter a number smaller than, or equal to, 50 for the Row Max.",
      required: "A number for Row Max is required. Please enter a number between -50 and 50."
    },
    col_min: {
      number: "Please enter a valid number between -50 and 50 for the Col Min.",
      min: "Please enter a number greater than, or equal to, -50 for the Col Min.",
      max: "Please enter a number smaller than, or equal to, 50 for the Col Min.",
      required: "A number for Col Min is required. Please enter a number between -50 and 50."
    },
    col_max: {
      number: "Please enter a valid number between -50 and 50 for the Col Max.",
      min: "Please enter a number greater than, or equal to, -50 for the Col Max.",
      max: "Please enter a number smaller than, or equal to, 50 for the Col Max.",
      required: "A number for Col Max is required. Please enter a number between -50 and 50."
    }
  },

  // gets called when the form is submitted
  submitHandler: function() {
    create_Table();
    return false;
  },

  invalidHandler: function() {
    // clear previous error and table so nothing shows when sumbitting with an error
    $("#Error_msg").empty();
    $("#Multiplication_table").empty();
  },

  errorElement: "div",
  errorPlacement: function(error, element) {
      error.insertAfter(element);
    }

  });
}




/* functions from hw5 */

function create_Table(){

  // getting var values from html forms
  var row_mini = Number(document.getElementById('row_min').value);
  var row_maxi = Number(document.getElementById('row_max').value);
  var col_mini = Number(document.getElementById('col_min').value);
  var col_maxi = Number(document.getElementById('col_max').value);

  // check to see if the numbers are read correctly. Required by assignment
  console.log("Row start: ", row_mini, "Row end: ", row_maxi, "Col start: ", col_mini, "Col end: ", col_maxi);

  // if the user inputs a max < min or min > max, swap them

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

  // minimum is -50 < x < 50
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

  console.log("Row start: ", row_mini, "Row end: ", row_maxi, "Col start: ", col_mini, "Col end: ", col_maxi);

  // using a matrix called table to store numbers.
  // need to store the input numbers so the calculation doesn't affect them
  var table = {};
  var row_s = row_mini;
  var col_s = col_mini;

  // calculate the distance between the numbers for the # of indices
  var rows = row_maxi - row_mini;
  var columns = col_maxi - col_mini;

  for(var i = 0; i <= columns; i++){
    var temp = [];

    for(var j = 0; j <= rows; j++){
      var result = row_s * col_s;
      temp[j] = result;
      row_s++;
    }

    table[i] = temp; // store our computed values
    row_s = row_mini; // reset the row start
    col_s++; // advance to the next column
  }

  fill_Table(table);

  // stops page from relaoding
  return false;
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

  console.log("After Boundary: Row start: ", row_mini, "Row end: ", row_maxi, "Col start: ", col_mini, "Col end: ", col_maxi);

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

return;
}

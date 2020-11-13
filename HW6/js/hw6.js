/*
File: /~amccombs/hw6/js/hw6.js
GUI 1 Assignment: Validation with jQuery
Allan Z. McCombs, UMass Lowell Computer Science, allan_mccombs@student.uml.edu
Copyright (c) 2020 by Allan Z McCombs. All rights reserved. May be
freely
copied or excerpted for educational purposes with credit to the
author.
updated by AZM November 12, 2020 at 10:49pm
*/


/* using many examples for help from https://www.w3schools.com/jquery/
Example here: https://jqueryvalidation.org/files/demo/?__cf_chl_jschl_tk__=93c09b8eafb91e113876f38dadcd42ddc1581b1f-1605230312-0-AZcdhEcwxBeezQ-fMx7By79vtgBNDQAD8gtMk6BpLi1um_DXlh99HHsFinLVTK8mjIbAxGsOecO3WzfQafm2Ly9b701LoOr5b9WkR_Ss75zF4Rph2bVFItqWy4t9r_335HFN9AbIMWwZ-e1EhXOFxppYq5bu_FLiWxZCONUEt9JktCYM5G4bRayYLtgangWx57CaZAzTXyxZ3Xz7vaBfWDamfnj6YCb0pvyYi4CC2_OhI-FFCjHYav_DdJW2V-x8VssuzWPC0278_863QQ01ILGsm2fQXi-sEthlpz_7FilX
Documentation help: https://jqueryvalidation.org/validate/?__cf_chl_captcha_tk__=25b92959ad283c55e9cb6aaabceeb39d57e5011c-1605233412-0-Afg3Jr4QcIWbk6u4ZBJ_vHVaqLlQj8PKy5n6rS905adq6SsGS5vueq71eFxKwnPUVD48s6HF28jXTAxQpy54V1HxBTrtBU5bYnEKoBZdNUXCJDHO6Mutav3_RYKcWukpuPcccMQ5u_VnHy4THzexKEEqeMrsC5aF_Xux81s2Pq93Pn1vUqunuSLVJ5_zzKNqCL1maFqpq55aQitqamL2v9zZK-mzJPtdmS2U0tiuwh3tw6ctYEeZX6bfriCGgi__YcStBkoPHEEXPOTdMGx4jU4kRJWnkdouEZYqNKLqK_mdcUMtrlNJCdpxaWsmY60MvL-eQYyC9ifoWRGmG_8f75niiojbg5ggCbdLMykci5_q__tRYhiz8Ypu4GdgwFWl1cS6LiZyU3poUzMy7aVNvBR-0Wvwj5_LdU51oLI7-QIHRG5aD0QwcDNr3ZRYSniQ1xgGLqsV-pg2tz-ZbPYRMjf5Jxr7aSlbd8k_uc_oxo2ObgIEITWNaQbbKbYLGHu5_LstezwuSuKAWxOzYVlwxJML9QZVLs0cbYtg9YYXlQXS
Video help: https://www.youtube.com/watch?v=ZQ7QlYX_UwI&ab_channel=B2Tech*/

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




/*functions from hw5*/

function create_Table(){

  /* getting var values from html forms */
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

Allan McCombs
Hw5

Used form to get input from user. Then used js file to take the input and check boundaries.

Js file has 2 functions to create and fill the table.

create_Table() takes the values given, calculates the poducts, and inserts them into a matrix. Then it calls
fill_Table and passes the matrix as a parameter.

fill_Table(table) takes a matrix as a parameter. Then, it creates string variable called fin_table. Using string
conatination, the function strings together table tags and the contents of the matrix to create a table. Lastly,
the function edits the innerHTML of the #Multiplication_table to display onto the html page.

Used css for basic styling. I could have used bootstrap, but I felt that was too much after finishing the overall
html and js files.

gh-page link: https://ajmccombs.github.io/GUI_1/
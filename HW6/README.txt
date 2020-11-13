Allan McCombs
Hw6

Taken what I had from HW5 and added jQuery validation.

In-line documentation for where I got help from.

Only major problem I had was that I was including
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
AND
<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ" crossorigin="anonymous"></script>

so validator() was not being seen as a valid funtion. After commenting out the second inclusion, which is for boostrap from
previous homeworks, then validator() was being recognized and the program works.

gh-page link: https://ajmccombs.github.io/GUI_1/

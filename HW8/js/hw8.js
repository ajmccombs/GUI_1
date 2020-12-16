/*
File: /~amccombs/hw8/js/hw8.js
GUI 1 Assignment: Scrabble
Allan Z. McCombs, UMass Lowell Computer Science, allan_mccombs@student.uml.edu
Copyright (c) 2020 by Allan Z McCombs. All rights reserved. May be
freely
copied or excerpted for educational purposes with credit to the
author.
updated by AZM December 13, 2020 at 2:13am
*/
upperCaseOffset = 65;

function scrabble () {
    /* GetJSON https://www.w3schools.com/jquery/ajax_getjson.asp*/
  $.getJSON("https://raw.githubusercontent.com/ajmccombs/GUI_1/master/HW8/graphics_data/pieces.json", function (json) {

  console.log("I'm in the js function")

      let boardLine = createBoardLine();
      let tiles = createRandomTiles(7, json);

      let score = 0;
      let highScore = score;
      let $score = $("#score");
      let $highScore = $("#highScore");

      let $holder = $("#holder")
      $holder.css("background-image", "url('graphics_data/holder.png')");

      dragndrop();

      $("#resetButton").button();
      $("#resetButton").click(function () {
          reset();
          dragndrop();
      });


      $("#submitButton").button();
      $("#submitButton").click(function () {
          if (highScore < score) {
              highScore = score;
              $highScore.text(`High Score: ${highScore}`);
          }

          $holder.children().remove();
          $("#boardLine").children().remove();

          let newHand = [];

          let tileIndex = 0;

          // reinsert unused tiles
          for(let i = 0; i < tiles.length; i++) {
              if (!tiles[i].getPlacementStatus()) {
                  newHand.push(new LetterTile(tiles[i].getLetter(), json, tileIndex));
                  tileIndex++;
              }
          }

          // random new tiles to fill in rest of hand
          for(let i = newHand.length; i < 7; i++) {
              newHand.push(new LetterTile(getRandomLetter(json), json, tileIndex));
              tileIndex++;
          }

          boardLine = createBoardLine();

          // create an array of tiles
          tiles = newHand;
          score = updateScore(boardLine);
          $score.text(`Score: ${score}`);

          dragndrop();
      });


    // early drap help https://www.youtube.com/watch?v=C22hQKE_32c&ab_channel=TraversyMedia
    // drag and drop handler
    function dragndrop(){

      $(".draggable").draggable({
                    revert: 'invalid'
                });


      $(".droppable").droppable({
        accept: function (item) {
            var dropLocation = $(this).attr("tile-index");
            if (boardLine[dropLocation].hasTile()){
              return false;
            }
            return true;
        },
        drop: function (event, ui) {
          var $this = $(this);
          var $draggedTo = ui.draggable;
          var draggedIndex = parseInt($draggedTo.attr("tile-index"), 10);
          var dropLocation = $(this).attr("tile-index");

          // Removing tile on move, or its counted twice
          for (var j = 0; j < boardLine.length; j++) {
            if (boardLine[j].hasTile()) {
              var tile = boardLine[j].getContainedTile().getID();
              if (draggedIndex === tile) {
                boardLine[j].setContainsTile(false);
              }
            }
          }

          boardLine[dropLocation].setContainedTile(tiles[draggedIndex]);
          tiles[draggedIndex].setPlaced(true);
          tiles[draggedIndex].setBoardLinePosition(dropLocation);

          score = updateScore(boardLine);
          $score.text(`Score: ${score}`);

          // tried https://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center
          // to center tile on spot but it wasn't working
          /* ui.draggable.position({
              my: "center",
              at: "center",
              of: $this,
              using: function (pos) {
                  $(this).animate(pos, 200, "linear");
              }
          });*/

        }
      });

      // putting a tile on the holder
      $("#holder").droppable({
          accept: function (item) {
              return true;
          },
          drop: function (event, ui) {
              var $dragged = ui.draggable;
              var draggedIndex = parseInt($dragged.attr("tile-index"), 10);

              // check if tile thinks it's placed
              // if tile knows it isn't placed, only need to update score
              if (tiles[draggedIndex].getPlacementStatus()) {

                  // remove tile from the boardLine
                  boardLine[tiles[draggedIndex].getBoardLineposition()].setContainsTile(false);
                  // set tile to unplaced
                  tiles[draggedIndex].setPlaced(false);
              }
              // update score to represent tile change
              score = updateScore(boardLine);
              $score.text(`Score: ${score}`);
          }
      });

  }

    // reset boardLine, holder, and scores
    function reset() {
        $holder.children().remove();
        $("#boardLine").children().remove();
        boardLine = createBoardLine();

        // create an array of tiles
        tiles = createRandomTiles(7, json);
        // changed my mind, didnt want to reset highscore but kept functionality
        // highScore = 0;
        // $highScore.text(`High Score: ${highScore}`);
        score = updateScore(boardLine);
        $score.text(`Score: ${score}`);
    }

});

    function updateScore(boardLine) {
        var continuity = false;
        var wordEnd = false;
        var isDW = false;
        var score = 0;
        for (var i = 0; i < boardLine.length; i++) {
            if (boardLine[i].hasTile() && !wordEnd) {
                continuity = true;
                let current_tile = boardLine[i].getContainedTile();
                tileType = boardLine[i].getTileType();

                // Apply score multipliers based on tile on the boardLine
                if (tileType === "dl") { // double letter
                    score += (current_tile.getPointValue() * 2);
                }
                else if (tileType === 'dw') { // double word
                    score += current_tile.getPointValue();
                    isDW = true;
                }
                else { // default
                    score += current_tile.getPointValue();
                }
            }
            else if (!boardLine[i].hasTile() && continuity === true) {
                wordEnd = true;
            }
            // Condition if the word is not continuous
            else if (wordEnd && boardLine[i].hasTile()) {
                score = 0;
                break;
            }
        }

        if (isDW) {
            score *= 2;
        }
        return score;
    }

    // handles the individual tiles
    class LetterTile {
        constructor(letter, json, id) {
            this.letter = letter.toUpperCase();
            let letterValue = letter.charCodeAt(0) - upperCaseOffset;
            this.tileObject = document.createElement("div");

            this.id = id;
            this.tileObject.setAttribute("tile-index", id);

            if (letter != "_") {
                this.pointValue = json.pieces[letterValue].value;
            }
            else {
                this.pointValue = json.pieces[26].value;
            }

            this.tileObject.className = "draggable";
            //apply background Image on correct Letter
            this.tileObject.style.backgroundImage = `url('graphics_data/Scrabble_Tiles/Scrabble_Tile_${this.letter}.jpg')`;
            const rack = document.getElementById('holder');
            holder.appendChild(this.tileObject);

            this.isPlaced = false;
        }

        getID() {
            return this.id;
        }

        getLetter() {
            return this.letter;
        }

        setBoardLinePosition(pos) {
            this.boardLinePosition = pos;
        }

        getBoardLineposition() {
            return this.boardLinePosition;
        }
        getPointValue() {
            return this.pointValue;
        }

        setTileIndex(i) {
            this.tileObject.setAttribute("tile-index", i);
        }

        setPlaced(placedStatus) {
            this.isPlaced = placedStatus;
            if (placedStatus === false) {
                this.boardPosition = null;
            }
        }

        getPlacementStatus() {
            return this.isPlaced;
        }
    }

    // handles the boardline tiles
    class BoardLineTile {
            constructor(type, id) {
                this.type = type;

                this.tileObject = document.createElement("div");
                // this.tileObject.id = "droppable";
                this.tileObject.className = "droppable";
                this.tileObject.style.backgroundImage = `url('graphics_data/Board_Tiles/Scrabble_Tile_${type}.png')`;

                this.id = id;
                this.containsTile = false;

                this.tileObject.setAttribute("tile-index", id);
                const boardLine = document.getElementById('boardLine');
                boardLine.appendChild(this.tileObject);
            }

            getID() {
                return this.id;
            }

            getTileType() {
                return this.type;
            }

            setTileIndex(id) {
                this.tileObject.setAttribute("tile-index", id);
            }

            setContainedTile(tile) {
                this.containedTile = tile;
                this.containsTile = true;
            }

            hasTile() {
                return this.containsTile;
            }

            setContainsTile(tileStatus) {
                this.containsTile = tileStatus;
                if (tileStatus === false) {
                    this.containedTile = null;
                }
            }

            getContainedTile() {
                return this.containedTile;
            }
        }

    // BoardLine array for arrangment
    const boardLine_array = ['default', 'default', 'dl', 'default', 'default', 'default', 'dw', 'default', 'dl', 'default', 'dw'];

    // create the boardLine
    function createBoardLine() {
        let boardLine = [];
        for (var i = 0; i < boardLine_array.length; i++) {
            boardLine[i] = new BoardLineTile(boardLine_array[i], i);
        }

        return boardLine;
    }

    // returns a random letter from the distribution
    function getRandomLetter(json) {
        const distri = generateLetterDistribution(json);
        const num = Math.floor(Math.random() * distri.length);
        return distri[num];
    }

    // generates a distribution from the scrabble json file
    function generateLetterDistribution(json) {
        let distri = [];
        for (var i = 0; i < 27; i++) {
            for (var j = 0; j < json.pieces[i].amount; j++) {
                distri.push(json.pieces[i].letter);
            }
        }
        return distri;
    }

    // Create an array of tiles with random letters
    function createRandomTiles(numTiles, json) {
        let arr = [];
        for (var i = 0; i < numTiles; i++) {
            arr[i] = new LetterTile(getRandomLetter(json), json, i);
        }

        return arr;
    }



}

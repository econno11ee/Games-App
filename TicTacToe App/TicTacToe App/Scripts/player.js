var player = function () {

}

player.prototype.init = function() {
    this._bindEvents();
   
};

player.prototype._bindEvents = function(){
    $(document).on("click", ".level", $.proxy(this._selectLevel));
    $(".start").on("click", $.proxy(this._startGame, this));
    $(document).on("click", ".cell", $.proxy(this._takeAHumanMove));

};

player.prototype._selectLevel = function(){
    var $this = $(this);
    $('.selected').toggleClass('not-selected');
    $('.selected').toggleClass('selected');
    $this.toggleClass('not-selected');
    $this.toggleClass('selected');
    ai.level = $this.attr("id");
    console.log(ai.level);
        
    };




//upon clicking start, set the var selectedDifficulty to the level you chose, create a new AI object passing the selectedDifficulty in as a parameter, create a
//new, global game object passing in the new AI object as a parameter, call the plays method of the new AI object, passing in the new game
//object as a parameter and the start method of the game object.
player.prototype._startGame = function () {
    var selectedDifficulty = $('.selected').attr("id");
    if(typeof selectedDifficulty !== "undefined") {
        var aiPlayer = new AI(selectedDifficulty);
       
        game = new Game(aiPlayer);
      
        aiPlayer.plays(game);
       
        game.start();
         
    }
};

//upon clicking a cell, if the game is still running and the value of the currentState turn property is "X" and the cell is not occupied, then capture
//the value of the data-indx attribute of that cell (the position of the cell) in the indx variable, create a new State object, passing in the currentState
//property of the game object as a parameter, assign the index of the board property (an array) the value "X", change the UI, call advanceTurn, andadvanceTo 
player.prototype._takeAHumanMove = function () {
    var $this = $(this);
    if(game.status === "running" && game.currentState.turn === "X" && !$this.hasClass('occupied')) {
        var indx = parseInt($this.data("indx"));
        console.log(game.currentState.board);
        var next = new State(game.currentState);
        console.log(next.board);
        next.board[indx] = "X";
        ui.insertAt(indx, "X");

        next.advanceTurn();//-->advances the turn to "O"
        
        game.advanceTo(next);//-->calls this.ai.notify("O")-->calls takeANoviceTurn("O")

        }
    };

var gnewPlayer = new player();

$(function(){
    gnewPlayer.init();
  });
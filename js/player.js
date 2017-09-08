//A global object that helps you access other objects set as properties attached to it
var globals = {};

//upon clicking the level you want, toggle class of difficulty level button and sets level property of the ai object depending on what level you chose

$(".level").each(function() {
    var $this = $(this);
    $this.click(function(){
        $('.selected').toggleClass('not-selected');
        $('.selected').toggleClass('selected');
        $this.toggleClass('not-selected');
        $this.toggleClass('selected');

        ai.level = $this.attr("id");
    });

});

//upon clicking start, set the var selectedDifficulty to the level you chose, create a new AI object passing the selectedDifficulty in as a parameter, create a
//new, global game object passing in the new AI object as a parameter, call the plays method of the new AI object, passing in the new game
//object as a parameter and the start method of the game object.
$(".start").click(function() {
    var selectedDifficulty = $('.selected').attr("id");
    if(typeof selectedDifficulty !== "undefined") {
        var aiPlayer = new AI(selectedDifficulty);
        globals.game = new Game(aiPlayer);

        aiPlayer.plays(globals.game);

        globals.game.start();
    }
});

//upon clicking a cell, if the game is still running and the value of the currentState turn property is "X" and the cell is not occupied, then capture
//the value of the data-indx attribute of that cell (the position of the cell) in the indx variable, create a new State object, passing in the currentState
//property of the game object as a parameter, assign the index of the board property (an array) the value "X", change the UI, call advanceTurn, andadvanceTo 
$(".cell").each(function() {
    var $this = $(this);
    $this.click(function() {
        if(globals.game.status === "running" && globals.game.currentState.turn === "X" && !$this.hasClass('occupied')) {
            var indx = parseInt($this.data("indx"));

            var next = new State(globals.game.currentState);
            next.board[indx] = "X";

            ui.insertAt(indx, "X");

            next.advanceTurn();

            globals.game.advanceTo(next);

        }
    })
});
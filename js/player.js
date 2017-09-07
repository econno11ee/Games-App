var globals = {};

//select difficulty leverl

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

//start the game, choose a player, set game status to running, change message to "your turn"
$(".start").click(function() {
    var selectedDiffeculty = $('.selected').attr("id");
    if(typeof selectedDiffeculty !== "undefined") {
        var aiPlayer = new AI(selectedDiffeculty);
        globals.game = new Game(aiPlayer);

        aiPlayer.plays(globals.game);

        globals.game.start();
    }
});

//depending on what cell was clicked, get next game state, update UI, change message to "your turn"
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
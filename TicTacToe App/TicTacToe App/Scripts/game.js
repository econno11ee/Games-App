//Constructs game object which keeps track of the aiplayer object, the status of the game(beginning, running, or over), and the state object.
//by assigning a new state with properties turn = "X", board = an array of 9 strings with the value "Embpty", and status = "beginning" to var currentState.  
//When the start function is called,that state is passed to the advanceTo function, which takes whatever state is passed in and reassigns it to currentState,
//assesses the isOver and either the result or turn property of that state and updates the ui accordingly

var Game = function(autoPlayer, player) {

    this.player = player;
    //initializes the aiplayer for this game
    this.ai = autoPlayer;
    
    //initializes the current state to an empy board configuration
    this.currentState = new State();

    this.currentState.board = ["Empty","Empty","Empty",
                                "Empty","Empty","Empty",
                                "Empty","Empty","Empty"];
    
    this.currentState.turn = "X"; //X plays first

    //initialize game status
    this.status = "beginning";
   

    //a function to advance the game to a new state
    this.advanceTo = function (_state) {
        
        var stats = function (_state) {
            this.GamePlayed = "TicTacToe";
            this.Level = autoPlayer.levelOfIntelligence;
            this.Duration = 5;
            this.PlayerID = "05cbcb7d-eeed-46dc-a698-9b92e9d39808"
            this.Result = _state.result;
            this.DatePlayed = new Date();
        };
        //resets the currentState var to _state
        this.currentState = _state;
        //sets the result property of _state, updates the ui, and calls ai.notify
        if (_state.isOver()) {          
            var gameStats = new stats(_state);
           
            this.status = "ended";
            this.player._storeGameStats(gameStats);

            if(_state.result === "X-won")
                ui.switchViewTo("won");
            else if(_state.result === "O-won")
                ui.switchViewTo("lost");
            else
                ui.switchViewTo("cats-eye");
        }
        else {
            if(this.currentState.turn === "X") {
                ui.switchViewTo("human");
            }
            else {
                ui.switchViewTo("robot");
                this.ai.notify("O");
                
            }
        }
        
    };

    //
    this.start = function() {
        if(this.status = "beginning") {
            
            this.advanceTo(this.currentState);
            this.status = "running";
            console.log("hello world");
        }
    };

};

//calculates final score (ai's goal is to minimize human player's score. The max
//score a human can get is 8)
Game.score = function(_state) {
    if (_state.result !== "still running") {
        if (_state.result == "X-won") {
        return 10 - _state.oMovesCount;
        } 
        else if(_state.result == "O-won") {
            return -10 + _state.oMovesCount;
        }
        else {
            return 0;
        }
    }
}




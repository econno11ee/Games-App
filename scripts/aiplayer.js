////Tic-tac-toe

//A global variable that represents the AI Player, takes level as a parameter, assigns the game, and defines a function .notify to
//return a number based on the level chosen
var AI = function(level) {
    this.levelOfIntelligence= level;
    this.game = {};
    
    //a recursive function that calculates the minimax value of a potential action(ie
    //probable final score from O's action).  The name is minimax because O maximizes
    //it's score by minimizing X's score 
    function minimaxValue(state) {
    //if the game is over, calculate the score
        if(state.isOver()) {
            return Game.score(state);A
        }
        else {
            var stateScore; //stores the calculated minimax
            if(state.turn==="X")
                stateScore = -1000; //smaller than any possible score
            else 
                stateScore = 1000; //larger than any possible score
            var availablePositions = state.emptyCells();
            //map() method creates a new array with the results of calling a function for ever array element,
            //so, for each empty cell assign the results of this function to an array named availableNextStates.
            //The results of this function are States.  They are accessed through the applyTo method of the AIAction object, which takes each
            //emptyCell as a potential action and returns a potential new State with an updated board array, oMovesCount, and turn
            var availableNextStates = availablePositions.map(function(pos) {
                var action = new AIAction(pos);
                var nextState = action.applyTo(state);
                return nextState;
    
    
            })
        //for each nextState in the availableNextStates array, check if it is the end of the game and return the score
        //if it is. If it is not the end of the score, get another round of available states, and, for each of those,
        //check if it is the end of the game and return the score if it is, and so on...
        availableNextStates.forEach(function(nextState) {
            var nextScore = minimaxValue(nextState) //recursive call loops for each availableNextState until all possible terminal states have a score
            //X wants to maximize --> update stateScore 
            if(state.turn === "X") {
                if (nextScore > stateScore) 
                    stateScore = nextScore; 
            }
            //o wants to minimize -->update stateScore
            else {
                if(nextScore < stateScore)
                    stateScore = nextScore;
                } 
        });
        return stateScore;
        }
    };

    function takeABlindMove(turn) {
        var available = game.currentState.emptyCells();
        var randomCell = available[Math.floor(Math.random() * available.length)];
        var action = new AIAction(randomCell);
    
        var next = action.applyTo(game.currentState);
    
        ui.insertAt(randomCell, turn);
    
        game.advanceTo(next);

    };

    function takeANoviceMove(turn) {
        console.log(game.currentState);
        console.log(game.currentState.emptyCells());
        var available = game.currentState.emptyCells();
        console.log(available);
        console.log(game.currentState);
        var availableActions = available.map(function(pos) {
            var action = new AIAction(pos);
            var nextState = action.applyTo(game.currentState);
            action.minimaxVal = minimaxValue(nextState);
            return action;
        });
        console.log(availableActions);

        

        if(turn === "X")
            availableActions.sort(AIAction.DESCENDING);
        else
            availableActions.sort(AIAction.ASCENDING);
            var chosenAction;
            if(Math.random()*100<=40) {
                chosenAction = availableActions[0];
            }
            else {
                if(availableActions.length >= 2) {
                    chosenAction = availableActions[1];
                }
            else {
                chosenAction = availableActions[0];
            }
    }
    console.log(chosenAction);
        var next = chosenAction.applyTo(game.currentState);
        console.log(game.currentState);
        console.log(next);
        ui.insertAt(chosenAction.movePosition, turn);
        game.advanceTo(next);
    };   


    function takeAMasterMove(turn) {
        //get an array of emptyCells
        var available = game.currentState.emptyCells();
        //get an array of available actions that include the movePosition and the minimaxVal
        var availableActions = available.map(function(pos) {
            var action = new AIAction(pos);
            //for each empty cell, get the new board array, oMovesCount, and turn
            var next = action.applyTo(game.currentState);
            //set the minimaxVal variable of AIAction object to the stateScore for each possible terminal state
            action.minimaxVal = minimaxValue(next);
            //return that movePosition and minimaxVal
            return action;
        });
    
        if (turn === "X")
            //if X played last, the score will be 10 - oMovesCount. Player wants to maximize so list the minimaxVals from largest to smallest to
            //get players most probably move. I think this part is obscelete because you will never be calling takeAMasterMove when it is player
            //x's turn.  X will be taking the move for themselves.  
            available.Actions.sort(AIAction.DESCENDING);
        else
            //if O played last, Ai wants to minimize, so list list minimaxVals from smallest to largest to
            //bet ai's best move?
            availableActions.sort(AIAction.ASCENDING);
    //choose the first action from the availableActions array
    var chosenAction = availableActions[0];
    var next = chosenAction.applyTo(game.currentState);

    ui.insertAt(chosenAction.movePosition, turn);

    game.advanceTo(next);
    };

    //specifies the game the object will play, by setting the game object to that game
    this.plays = function(_game){
        this.game=_game;
    };
    
    //call the appropriate takeAMove function based on the level
    this.notify = function(turn) {
        console.log(turn);
        switch(this.levelOfIntelligence) {
            case "blind": 
                takeABlindMove(turn);
                break;
            case "novice": 
                takeANoviceMove(turn)
                break;
            case "master": 
            takeAMasterMove(turn);
            break;
        }
    }
};

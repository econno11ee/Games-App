//constructs an action the ai player COULD make, updates the board array, the oMovesCount++, and the turn

var AIAction = function(pos) {
    //the position on the board resulting from the action
    this.movePosition = pos;

    //the number value of the State the action results in
    this.minimaxVal = 0;

    //the next state resulting from applying the action to the current state
    this.applyTo = function(state) {
        var next = new State (state);

        //sets the value of the index of the board array chosen by the ai to "0" for the next state
        next.board[this.movePosition] = state.turn;

        //increments the oMovesCount propert of the next state and calls advanceTurn, and returns the next state 
        if(state.turn === "O")
            next.oMovesCount++;
        next.advanceTurn();
        return next;
        
    }
};

//sorts values of AIAction objects' respective minimaxVal properties in ascending order 
AIAction.ASCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal < secondAction.minimaxVal)
        return -1;
    else if(firstAction.minimaxVal > secondAction.minimaxVal)
        return 1;
    else
        return 0;
}
//sorts values of AIAction objects' respective minimaxVal properties in descending order
AIAction.DESCENDING = function(firstAction,secondAction) {
    if(firstAction.minimaxVal > secondAction.minimaxVal)
        return -1;
    else if(firstAction.minimaxVal < secondAction.minimaxVal)
        return 1;
    else
        return 0;
}


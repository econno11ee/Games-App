//Tic-tac-toe

//A global variable that represents a state in the game

var State = function (oldState) {
    //declare object variables
    this.turn = "";
    this.oMovesCount = 0;
    this.result = "still running";
    this.board = [];
   

    //Begin object Construction
    if(typeof oldState !== "undefined") {
        var len = oldState.board.length;
        this.board = new Array(len);
        for (var i; i<len;i++){
            this.board[i]=oldState.board[i];
        }

        this.oMovesCount = oldState.oMovesCount;
        this.result = oldState.result;
        this.turn = oldState.turn;
    }

    //End object construction

    //advance the turn

    this.advanceTurn = function() {
        this.turn = this.turn === "X" ?  "O" : "X";
    }

    //count empty cells

    this.emptyCells = function() {
        var empties = [];
        for(var i=0;i<9;i++) {
            if(this.board[i]==="Empty") {
                empties.push(i);
            }
        }
        return empties;
    }

    //check if the game is over
    this.isOver = function() {
        var B = this.board;

        //check for completed rows
        for(var i=0; i<=6;i=i + 3) {
            if (B[i] !== "Empty" && B[i] === B[i+1] && B[i+1] == B[i + 2]) {
                this.result =B[i] + "-won";
                return true;
            }
        }
        
        //check for completed columns
        for(var i=0; i<=2;i=i++) {
            if (B[i] !== "Empty" && B[i] === B[i+3] && B[i+1] == B[i + 6]) {
                this.result =B[i] + "-won";
                return true;
            }
        }

        //check for completed diagonals
        for(var i=0, j=4; i<=2;i=i+2, j=j-2) {
            if (B[i] !== "Empty" && B[i] === B[i+j] && B[i+j] == B[i + 2*j]) {
                this.result =B[i] + "-won";
                return true;
            }
        }
        //cehck for a draw

        var available = this.emptyCells();
        if(available.length == 0) {
            this.result="draw";
            return true;
        }
        else {
            return false;
        }
    };
};
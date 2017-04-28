'use strict';

var ROWS = 3;
var COLS = 3;
var moves;

function get_utility(s){

	//check winner per row
	for(var i=0; i<ROWS; i++){
		if(s.board[i][0] != ' ' && s.board[i][0] == s.board[i][1] && s.board[i][1] == s.board[i][2]){
			if(s.board[i][0] == 'X')	return 1
			else						return -1
		}
	}

	//check winner per column
	for(var i=0; i<COLS; i++){
		if(s.board[0][i] != ' ' && s.board[0][i] == s.board[1][i] && s.board[1][i] == s.board[2][i]){
			if(s.board[0][i] == 'X')	return 1
			else						return -1
		}
	}

	//check winner per diagonal
	if(s.board[0][0] != ' ' && s.board[0][0] == s.board[1][1] && s.board[1][1] == s.board[2][2]){
		if(s.board[0][0] == 'X')	return 1
		else						return -1
	}else if(s.board[2][0] != ' ' && s.board[2][0] == s.board[1][1] && s.board[1][1] == s.board[0][2]){
		if(s.board[2][0] == 'X')	return 1
		else						return -1
	}else{
		//check if it is a terminal node or not
		for(var i=0; i<ROWS; i++){
			for(var j=0; j<COLS; j++){
				if(s.board[i][j] == ' '){
					if(s.turn == 'X')	return Number.MAX_VALUE * -1
					else				return Number.MAX_VALUE
				}
			}	
		}
		//draw
		return 0;
	}

}

/* Returns the next state given an action */
function result(s, a){	
	var next_state = {
		board: [],
		turn: s.turn == 'X' ? 'O' : 'X'
	};
	
	for(var i=0; i<s.board.length; i++){
		next_state.board[i] = s.board[i].slice();
	}

	next_state.board[a.x_coord][a.y_coord] = s.turn == 'X' ? 'X' : 'O';
	return next_state;
}

function printBoard(s){
	var string = "";
	for(var i = 0; i < ROWS; i++){
		for(var j = 0; j < COLS; j++){
			string = string + s.board[i][j] + " ";
		}
		string = string + "\n";
	}

	console.log(string);
}

function next_move(s){
	var utility = -1;
	var optimal = {
		x_coord: -1,
		y_coord: -1,
		moves: Number.MAX_VALUE
	};

	//iterate for all possible moves and choose the optimal move
	for(var i=0; i<ROWS; i++){
		for(var j=0; j<COLS; j++){
			if(s.board[i][j] == ' '){
				
				var a = {
					x_coord: i,
					y_coord: j
				}

				//restart the number of moves
				moves = 0;
				//check the utility of each next move of the current state
				var next_state = result(s, a);
				var v = value(next_state);

				//compare and choose the best move
				if(v >= utility && moves <= optimal.moves){
					utility = v;
					optimal.x_coord = i;
					optimal.y_coord = j;
					optimal.moves = moves;
				}	
				
			}
		}
	}

	return optimal;
}

function value(s){
	var x = get_utility(s);
	moves += 1;
	if(x == 1 || x == -1 || x == 0){ //terminal
		return x;
	}
	else if(x < 1){
		return max_value(s);
	}
	else if(x > 1){
		return min_value(s);
	}
}

//creates a max node that looks for the branch with the lowerst utility
function min_value(s){
	var m = Number.MAX_VALUE;
	var next_state;

	for(var i=0; i<ROWS; i++){
		for(var j=0; j<COLS; j++){
			if(s.board[i][j] == ' '){
				var a = {
					x_coord: i,
					y_coord: j
				}

				next_state = result(s, a);
				var v = value(next_state);

				if(v < m)	m = v;
				
			}
		}
	}
	return m

}

//creates a max node that looks for the branch with the highest utility
function max_value(s){
	var m = Number.MAX_VALUE * -1;
	var next_state;

	for(var i=0; i<ROWS; i++){
		for(var j=0; j<COLS; j++){
			if(s.board[i][j] == ' '){
				var a = {
					x_coord: i,
					y_coord: j
				}

				next_state = result(s, a);
				var v = value(next_state);

				if(v > m)	m = v;
				
			}
		}
	}
	return m
}

function getBoard(s){

}

var state = {
	board: [],
	turn: 'X'
};
var board = [
			[' ',' ',' '],
			[' ',' ',' '],
			[' ',' ',' ']
		];

state.board = board;

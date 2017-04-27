'use strict';

var board = [3][3];
var state = {
	utility: 0,
	board: board,
	turn: 'X'
};
var action = {
	x_coord: -1,
	y_coord: -1
}
var ROWS = 3;
var COLS = 3;

function get_utility(s){

	//check winner per row
	for(var i=0; i<ROWS; i++){
		if(s.board[i][0] != ' ' && s.board[i][0] == s.board[i][1] && s.board[i][1] == s.board[i][2]){
			if(s.turn == 'X'){
				if(s.board[i][0] == 'X')	return 1
				else						return -1
			}else{
				if(s.board[i][0] == 'X')	return -1
				else						return 1
			}
		}
	}

	//check winner per column
	for(var i=0; i<COLS; i++){
		if(s.board[0][i] != ' ' && s.board[0][i] == s.board[1][i] && s.board[1][i] == s.board[2][i]){
			if(s.turn == 'X'){
				if(s.board[i][0] == 'X')	return 1
				else						return -1
			}else{
				if(s.board[i][0] == 'X')	return -1
				else						return 1
			}
		}
	}

	//check winner per diagonal
	if(s.board[0][0] != ' ' && s.board[0][0] == s.board[1][1] && s.board[1][1] == s.board[2][2]){
		if(s.turn == 'X'){
				if(s.board[i][0] == 'X')	return 1
				else						return -1
			}else{
				if(s.board[i][0] == 'X')	return -1
				else						return 1
			}
	}else if(s.board[2][0] != ' ' && s.board[2][0] == s.board[1][1] && s.board[1][1] == s.board[0][2]){
		if(s.turn == 'X'){
				if(s.board[i][0] == 'X')	return 1
				else						return -1
			}else{
				if(s.board[i][0] == 'X')	return -1
				else						return 1
			}
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
		return 0;
	}

}

function result(s, a){
	var next_state = {
		utility: get_utility(s),
		board: s.board,
		turn: s.turn
	};

	next_state.board[a.x_coord][a.y_coord] = next_state.turn = 'X' ? 'X' : 'Y';

	return next_state;
}

function value(s){
	var x = get_utility(s);

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

function min_value(s){
	var m = Number.MAX_VALUE;
	var next_state;

	for(var i=0; i<ROWS; i++){
		for(var j=0; j<COLS; j++){
			if(s.board[i][j] == ' '){
				var a = {
					x_coord: i,
					y_coord: j
				};

				next_state = result(s, a);
				var v = value(next_state);

				if(m > v){
					action.x_coord = i;
					action.y_coord = j;
					m = v;
				}
			}
		}
	}
	return m

}

function max_value(s){
	var m = Number.MAX_VALUE * -1;
	var next_state;

	for(var i=0; i<ROWS; i++){
		for(var j=0; j<COLS; j++){
			if(s.board[i][j] == ' '){

				var a = {
					x_coord: i,
					y_coord: j
				};

				next_state = result(s, a);

				var v = value(next_state);

				if(m < v){
					action.x_coord = i;
					action.y_coord = j;
					m = v;
				}
			}
		}
	}
	return m
}



function getBoard(s){

}


board = [
			[' ',' ',' '],
			[' ','O',' '],
			[' ',' ',' ']
		]
state.board = board;
state.utility = get_utility(state);
value(state);
console.log(action);
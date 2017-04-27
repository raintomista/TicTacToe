'use strict';

var board = [3][3];
var state = {
	utility: 0,
	board: board,
	turn: 'X'
};
var ROWS = 3;
var COLS = 3;

function get_utility(s){

	//check winner per row
	for(var i=0; i<ROWS; i++){
		if(s.board[i][0] != ' ' && (s.board[i][0] == s.board[i][1] == s.board[i][2])){
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
		if(s.board[0][i] != ' ' && (s.board[0][i] == s.board[1][i] == s.board[2][i])){
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
	if(s.board[0][0] == s.board[1][1] == s.board[2][2]){
		if(s.turn == 'X'){
				if(s.board[i][0] == 'X')	return 1
				else						return -1
			}else{
				if(s.board[i][0] == 'X')	return -1
				else						return 1
			}
	}else if(s.board[2][0] == s.board[1][1] == s.board[0][2]){
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
					if(s.turn == 'X')	return Number.MIN_VALUE
					else				return Number.MAX_VALUE
				}
			}	
		}
		return 0;
	}

}

function value(s){

}

function min_value(s){
	var m = Number.MIN_VALUE;
	

}

function max_value(s){
	var m = Number.MAX_VALUE;
	
}



function getBoard(s){

}


board = [
			['X',' ','O'],
			['O',' ','X'],
			['X',' ','O']
		]
state.board = board;
state.utility = get_utility(state);
console.log(state);
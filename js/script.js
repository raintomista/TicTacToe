var symbolArray = ['remove icon', 'circle icon'];
var currentPlayer = 0;

function toggle(e){
	var newElement = document.createElement('i');
	newElement.setAttribute('class', symbolArray[currentPlayer]);
	e.appendChild(newElement);
	var x = e.value.split(",")[0];
	var y = e.value.split(",")[1];
	if(currentPlayer == 0){
		currentPlayer = 1;
		document.getElementById('circle-score').setAttribute('class', 'ui huge red segment');
		document.getElementById('cross-score').classList.remove("red");
		state.board[x][y] = "X";
	}
	else{
		currentPlayer = 0;
		document.getElementById('cross-score').setAttribute('class', 'ui huge red segment');
		document.getElementById('circle-score').classList.remove("red");
		state.board[x][y] = "O";
	}

	

	printBoard(state);
	e.disabled = true;

}
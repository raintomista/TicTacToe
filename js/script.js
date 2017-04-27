var symbolArray = ['remove icon', 'circle icon'];
var currentPlayer = 0;

function restart_game(){
	var buttons = document.querySelectorAll('.ui.fluid.button');
	var count = buttons.length;

	for(var i = 0; i < count; i++){
		buttons[i].setAttribute('class', 'ui fluid button');
		buttons[i].removeChild(buttons[i].childNodes[0]);
		buttons[i].disabled = false;  
	}
}

function disableAll(){
	var buttons = document.querySelectorAll('.ui.fluid.button');
	var count = buttons.length;

	for(var i = 0; i < count; i++){
		buttons[i].disabled = true;
	}
}

function toggle(x, y){
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
	
}

function toggleAI(){
	console.log("ai ako" + currentPlayer);
	var move = next_move(state);
	var elemValue = move.x_coord + "," + move.y_coord;

	var buttons = document.querySelectorAll('.ui.fluid.button');
	var count = buttons.length;

	for(var i = 0; i < count; i++){
		if(buttons[i].value == elemValue){
			buttons[i].setAttribute('class', 'ui red fluid red button');
			toggleBtn(buttons[i]);
		}

	}

	var win_condition = get_utility(state);	
	if(win_condition == 0){
		document.getElementById('title').innerHTML += ' - Draw';
		disableAll()
	}
	else if(win_condition == 1){
		document.getElementById('title').innerHTML += ' - AI wins';
		disableAll()
	}
	else if(win_condition == -1){
		document.getElementById('title').innerHTML += ' - Player Wins';
		disableAll()
	}
}

function toggleBtn(e){
	// console.log(currentPlayer);
	var newElement = document.createElement('i');
	newElement.setAttribute('class', symbolArray[currentPlayer]);
	e.appendChild(newElement);
	toggle(e.value.split(",")[0] ,e.value.split(",")[1]);
	printBoard(state);
	e.disabled = true;
}

function toggleUser(e){
	toggleBtn(e)
	console.log("current player: "  + currentPlayer);
	toggleAI();
}
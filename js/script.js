var symbolArray = ['remove icon', 'circle icon'];
var currentPlayer = 0;

function toggle(e){
	var newElement = document.createElement('i');
	newElement.setAttribute('class', symbolArray[currentPlayer]);
	e.appendChild(newElement);
	if(currentPlayer == 0){
		currentPlayer = 1;
		document.getElementById('circle-score').setAttribute('class', 'ui huge red segment');
		document.getElementById('cross-score').classList.remove("red");
	}
	else{
		currentPlayer = 0;
		document.getElementById('cross-score').setAttribute('class', 'ui huge red segment');
		document.getElementById('circle-score').classList.remove("red");
	}
	e.disabled = true;

}
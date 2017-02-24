document.addEventListener("DOMContentLoaded", ready);
function ready() {
	document.addEventListener('keydown', keyCode);
}
function keyCode(e) {
	if(e.key == ' ') document.getElementById('keyName').innerText = 'Key Name: ' +e.code;	
	else document.getElementById('keyName').innerText = 'Key Name: ' +e.key;	
	document.getElementById('keyCode').innerText = 'Key Code: ' + e.keyCode;	
}
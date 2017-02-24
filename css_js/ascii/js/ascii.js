document.addEventListener('DOMContentLoaded', ready);

function ready() {

	document.getElementById('start').addEventListener('click', generateTable);
}
function generateTable(e) {
	e.preventDefault();
	if(document.getElementsByTagName('table')[0])
		document.getElementsByTagName('table')[0].remove();
	var from = +document.getElementById('fromSymbolVal').value || 0 ;
	var to = +document.getElementById('toSymbolVal').value || 99 ;

	var table = document.createElement('table');
	document.body.appendChild(table);
	for (var i = 0; i < 5; i++) {
	var th1 = document.createElement('th');
	th1.innerHTML = 'Code';
	var th2 = document.createElement('th');
	th2.innerHTML = 'Symbol';
	table.appendChild(th1);
	table.appendChild(th2);
	}
	var count = 0;
	for(var k = from; k <= to; k++) {
		if(count % 5 === 0) 
			{
				var tr = document.createElement('tr');
				table.appendChild(tr);
			}
		var td = document.createElement('td');
		td.innerHTML = '&amp;#' + k +';';
		
		var td1 = document.createElement('td');
		td1.innerHTML = charGenerate(k) ;
		tr.appendChild(td);
		tr.appendChild(td1);
		count++;
	}
}
function charGenerate(i) {
	return (String.fromCharCode(i));
}


//  хинт для фанатов символов: 
// в windows запускаем charmap, выбираем понравившийся символ, 
// смотрит его hex код в статус баре, переводим в уме в dec (калькулятором тоже можно)
// , &# + dec + ; — и есть ваш символ. А еще в любом поле ввода или редакторе можно
//  ввести ваш любимый символ так: нажал alt, вбил dec-код символа (только цифры), отпустил альт. 
//  Например Alt + 0169 = ©
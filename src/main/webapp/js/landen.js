function deleteLand(code) {
	console.log(code);
	
	fetch('http://localhost:8080/firstapp/restservices/countries/' + code, {method: 'DELETE'})
		.then((response) => {
			initPage();
			console.log("deleted");
		});
}

function store() {	
	var formData = new FormData(document.querySelector("#save_form"));
	var encData = new URLSearchParams(formData.entries());
	let er = document.getElementById("error");
	er.innerHtml = "";
	
	fetch('http://localhost:8080/firstapp/restservices/countries', {method: 'POST', body: encData})
	.then((response) => {
		if (response.status == 402) { 
			er.innerHTML = "er is iets fout gegaan.";
			console.log("error2");
			console.log(er);
		}
		initPage();
	});
	
	return false;
}

function updateLand(clickedButton) {
	var code = clickedButton.getAttribute("data-code");
	var row = document.querySelector('#row_' + code);
	let sur = row.querySelector('input[name="surface"]').value;
	let pop = row.querySelector('input[name="population"]').value;
	
	let data = {
		name: row.querySelector('input[name="name"]').value,
		capital: row.querySelector('input[name="capital"]').value,
		surface: Number.parseInt(sur),
		population: Number.parseInt(pop)
	};
	
	var encData = new URLSearchParams(data);
	console.log(encData);
	fetch("http://localhost:8080/firstapp/restservices/countries/" + code, {method: 'PUT', body: encData})
		.then((myJson) => {
			console.log(myJson);
		});
	
	console.log(data);
}

function initPage() {
	fetch('http://localhost:8080/firstapp/restservices/countries/')
		.then(response => response.json())
		.then((myJson) => {
			let table = document.querySelector('tbody');
			table.innerHTML = "";
			
			var i = 0;
			for (i; i < myJson.length; i++) {
				table.innerHTML = table.innerHTML + "<tr class='row' id='row_" + myJson[i].code  + "'>" +
					"<td>" + myJson[i].code + "</td>" +
					"<td>" + "<input type='text' name='name' value='" + myJson[i].name + "' />" + "</td>" +
					"<td>" + "<input type='text' name='capital' value='" + myJson[i].capital + "' />" + "</td>" +
					"<td>" + "<input type='number' name='surface' value='" + myJson[i].surface + "' />" + "</td>" +
					"<td>" + "<input type='number' name='population' value='" + myJson[i].population + "' />" + "</td>" +
					"<td>" + "<input type='button' class='update' data-code='" + myJson[i].code + "' value='UPD'/>" + "</td>" +
					"<td>" + "<input type='button' class='delete' data-code='" + myJson[i].code + "' value='DEL'/></td>" +
					"</tr>";
			}
			
			var deleteButtons = document.getElementsByClassName('delete');
			for (i = 0; i < deleteButtons.length; i++) {
				deleteButtons[i].addEventListener('click', (event) => {
					let deletebutton = event.target.closest(".delete");
					deleteLand(deletebutton.getAttribute("data-code"));
				}, false);
			}
			
			var updateBunttons = document.getElementsByClassName('update');
			for (i = 0; i < updateBunttons.length; i++) {
				updateBunttons[i].addEventListener('click', (event) => {
					let updateBuntton = event.target.closest(".update");
					updateLand(updateBuntton);
				}, false);
			} 
		});
}

//let saveButton = document.querySelector('#save_button');
//saveButton.addEventListener('click', (event) => {
//	store();
//	initPage();
//}, false);

initPage();
let saveButton = document.querySelector('#login_button'); 
saveButton.addEventListener('click', (event) => {
	var formData = new FormData(document.querySelector("#login_form"));
	var encData = new URLSearchParams(formData.entries());
	document.querySelector("#error").innerHTML = "";
	
	fetch('restservices/authentication', {method: 'POST', body: encData})
	.then((response) => { 
		if (response.ok) {
			return response.json();
		} else {
			document.querySelector("#error").innerHTML = "Inlog gegevens niet correct";
		}
	})
	.then((myJson) => {
		window.sessionStorage.setItem("sessionToken", myJson.JWT);
		window.location.href = "https://localhost:8443/firstapp/landen.html";
	});
}, false);
function exportCSV(){
	//send request
	let req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			//alert("Changes have been saved on the server!");
			//refresh page with saved data
            //window.location.href = '/items/' + modItem.id;
            console.log(this.responseText);
		}
	}
    req.open("GET", "/items");
	req.setRequestHeader("Content-Type", "application/json");
    req.send();
}
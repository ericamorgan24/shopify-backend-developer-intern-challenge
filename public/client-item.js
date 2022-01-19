function save(){
	//create object to represent updated item
    let modItem = {};
    modItem.id = document.getElementById("itemID").innerText;
    modItem.name = document.getElementById("name").value;
    modItem.price = Number(document.getElementById("price").value);
    modItem.quantity = Number(document.getElementById("quantity").value);

	//check if valid data
    if (modItem.name == "" || isNaN(modItem.price) || !Number.isInteger(modItem.quantity)){
        alert("Cannot save!");
        return;
    }
    
	//send request
	let req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			alert("Changes have been saved on the server!");
			//refresh page with saved data
            window.location.href = '/items/' + modItem.id;
		}
	}
    req.open("PUT", "/items/" + modItem.id);
	req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(modItem));
}

function deleteItem() {
    //get item ID
    let itemID = document.getElementById("itemID").innerText;

    //send request
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Item has been deleted from the server!");
            //refresh page with saved data
            window.location.href = '/items';
        }
    }
    req.open("DELETE", "/items/" + itemID);
    req.setRequestHeader("Content-Type", "application/json");
    req.send();
}










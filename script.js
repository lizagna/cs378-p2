// var macQuantity = 0;
// var pastaQuantity = 0;
// var tacoQuantity = 0;
// var enchiladaQuantity = 0;
// var subtotal = 0;

var data = {
    mac: {
        id: 1001,
        name: "mac & cheese",
        orderQuantity: 0,
        price: 5.0,
    },
    pasta: {
        id: 1002,
        name: "pasta",
        orderQuantity: 0,
        price: 8.0,
    },
    tacos: {
        id: 1003,
        name: "tacos",
        orderQuantity: 0,
        price: 8.0,
    },
    enchilada: {
        id: 1004,
        name: "enchilada",
        orderQuantity: 0,
        price: 10.0,
    },
    subtotal: 0.0
};

$(document).ready(function () {});

function onClickRemove(input) {
    let foodName = input[0];
    let quantityId = input[1];
    let foodItemQuantity = data[foodName].orderQuantity;

    if (foodItemQuantity == 0) {
        console.log("can't remove value below 0")
        return;
    }

    foodItemQuantity--;
    document.getElementById(quantityId).innerHTML = foodItemQuantity;

    data[foodName].orderQuantity = foodItemQuantity;
    calculateSubtotal(data[foodName]);
}

function onClickAdd(input) {
    let foodName = input[0];
    let quantityId = input[1];
    let foodItemQuantity = data[foodName].orderQuantity;

    foodItemQuantity++;
    document.getElementById(quantityId).innerHTML = foodItemQuantity;

    data[foodName].orderQuantity = foodItemQuantity;
    calculateSubtotal(data[foodName]);
}

function calculateSubtotal() {
    subtotal = 0;
    // document.getElementsById("order-subtotal").innerHTML = "$" + subtotal;
    
    let foodNames = ["mac", "pasta", "tacos", "enchilada"];
    
    foodNames.forEach(function(foodName) {
        // let quantityId = foodName + "-quantity";
        var foodItem = data[foodName];
        let value = foodItem.price * foodItem.orderQuantity;
        // console.log(foodItem.name + ": " + value);
        subtotal += value;
        
        // document.getElementById(quantityId).innerHTML = "0";
        // data[foodName].orderQuantity = 0;
    });
    console.log(subtotal);
    document.getElementById("order-subtotal").innerHTML = "$" + subtotal;

}

function updateSubtotal(foodItem, operationMethod) {
    let value = foodItem.orderQuantity * foodItem.price;
    
    if (operationMethod == "+") {
        subtotal += value;
    } else {
        subtotal -= value;
    }

    document.getElementById("order-subtotal").innerHTML = "$" + subtotal;
}

function clearAll() {
    subtotal = 0;
    
    let foodNames = ["mac", "pasta", "tacos", "enchilada"];
    console.log(foodNames);
    foodNames.forEach(function(foodName) {
        // console.log(foodName);
        let quantityId = foodName + "-quantity";
        
        // console.log(quantityId);
        // console.log(document.getElementById(quantityId));
        data[foodName].orderQuantity = 0;

        let element = document.getElementById(quantityId);
        if (element)
            document.getElementById(quantityId).innerHTML = 0;
    });

    calculateSubtotal();

    // document.getElementById("order-subtotal").innerHTML = "$0";
  
}

function submitOrder() {
    
}
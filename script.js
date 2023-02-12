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

var foodNames = ["mac", "pasta", "tacos", "enchilada"];

/**
 * Handles modal display modes
 */
document.addEventListener("DOMContentLoaded", function () {
    // Get the modal
    var orderPlacedModal = document.getElementById("order-confirmation");

    var btnClose = document.getElementById("btnClose");

    // When the user clicks on OK, close the modal
    btnClose.onclick = function () {
        orderPlacedModal.style.display = "none";
        clearAll();
    }

    // When the user clicks anywhere outside of the modal, close it but still keep data
    window.onclick = function (event) {
        if (event.target == orderPlacedModal) {
            orderPlacedModal.style.display = "none";
        }
    }
});

/**
 * When the button is clicked it removes 1 item from the respective food item
 * and updates the HTML value and the JSON object
 * @param {*} input array that stores the food name and quantity id
 */
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

/**
 * When the button is clicked it adds 1 item from the respective food item
 * and updates the HTML value and the JSON object
 * @param {*} input array that stores the food name and quantity id
 */
function onClickAdd(input) {
    let foodName = input[0];
    let quantityId = input[1];
    let foodItemQuantity = data[foodName].orderQuantity;

    foodItemQuantity++;
    document.getElementById(quantityId).innerHTML = foodItemQuantity;

    data[foodName].orderQuantity = foodItemQuantity;
    calculateSubtotal(data[foodName]);
}

/**
 * Computes the order total for the current state of the menu
 */
function calculateSubtotal() {
    subtotal = 0;

    foodNames.forEach(function (foodName) {
        var foodItem = data[foodName];
        let value = foodItem.price * foodItem.orderQuantity;
        subtotal += value;
    });

    document.getElementById("order-subtotal").innerHTML = "Subtotal $" + subtotal;
}


// function setOrderBtnVisibility(subtotal) {
//     var btnGrp = document.getElementsByClassName("order-btn-grp");

//     for (var i = 0; i < btnGrp.length; i++)
//     {
//         if (subtotal > 0) {
//             btnGrp[i].style.display = "block";
//         } else {
//             btnGrp[i].style.display = "none";
//         }

//     };
// }

/**
 * Not used but another option to calculate the subtotal
 * @param {*} foodItem the JSON object
 * @param {*} operationMethod adding or subtracting from subtotal
 */
function updateSubtotal(foodItem, operationMethod) {
    let value = foodItem.orderQuantity * foodItem.price;

    if (operationMethod == "+") {
        subtotal += value;
    } else {
        subtotal -= value;
    }

    document.getElementById("order-subtotal").innerHTML = "$" + subtotal;
}

/**
 * Resets all the food item quantity values back to 0 and the subtotal back to 0
 */
function clearAll() {
    subtotal = 0;
    /**
     * Goes through each food item and zeros out their quantities
     */
    foodNames.forEach(function (foodName) {
        let quantityId = foodName + "-quantity";

        data[foodName].orderQuantity = 0;

        let element = document.getElementById(quantityId);
        if (element)
            document.getElementById(quantityId).innerHTML = 0;
    });

    calculateSubtotal();
}

/**
 * Enables the modal to pop-up modal and displays the item and quantity of items ordered
 */
function submitOrder() {
    let orderedItems = "";
    foodNames.forEach(function (foodName) {
        let itemQuantity = data[foodName].orderQuantity;
        if (itemQuantity > 0) {
            let itemName = data[foodName].name;
            orderedItems += "" + itemQuantity + " " + itemName + " ";
        }
    });
    
    let confirmationTitle = "Order placed!";
    if (orderedItems === "") {
        confirmationTitle = "No items in cart";
    } 
    document.getElementById("order-confirmation-title").innerHTML = confirmationTitle;
        
    document.getElementById("confirmed-items").innerHTML = orderedItems;
    var orderPlacedModal = document.getElementById("order-confirmation");
    orderPlacedModal.style.display = "block";
}
var macQuantity = 0;

$(document).ready(function () {
    
});

function onClickRemove(quantityId) {
    if (macQuantity == 0) return;

    macQuantity--;
    document.getElementById(quantityId).innerHTML = macQuantity;
    
}

function onClickAdd(quantityId) {
    // need to validate max
    macQuantity++;
    document.getElementById(quantityId).innerHTML = macQuantity;
    
}

// document.getElementById("submit").addEventListener('click', myFunction);
// function myFunction(e){
//     var result = document.getElementById('bankAccountBalance').value;
//     alert(result);
// }
document.getElementById("submit").addEventListener('click', calculateResult);

document.getElementById("bankAccountBalance").addEventListener('keyup', formatInput );

function calculateResult(b,s){
    var input = document.getElementById('bankAccountBalance').value;//bank balance set by user fprmatted as a string
    var bankAccountBalance = getNumber(input);
    var spendingThreshold = getSpendingThreshold();    
    var taxRate = .06;
    var phonePrice = 70;
    var accessoryPrice = 30;
    var amount = 0;
    var phones = 0;
    var accessories = 0; 
    while (amount < (bankAccountBalance - (phonePrice *(1 + taxRate)))) {
        phones = phones + 1;
        amount = (amount + phonePrice) * (1 + taxRate);
        if (amount < spendingThreshold) {
            accessories = accessories + 1;
            amount = (amount + accessoryPrice) * (1 + taxRate); 
        console.log(amount);
        };   
    };
    
    var li = document.createElement("li");
    li.innerHTML= "<li class='results'> You spent " + formatOutput(amount) + " for "  + phones + " phones and " + accessories +  " accessories.</li>";
    document.getElementById('results').innerHTML = "";
    document.getElementById('results').appendChild(li);

};

function getSpendingThreshold() {
    //for loop finding val of radial input
    var options = document.getElementsByName('optionsRadios');
    var s;
    for(var i = 0; i < options.length; i++){
        if(options[i].checked){
            s = options[i].value;  
        }
    }
     
    return Number(s); //which one they selected
};

function formatOutput(amount) {
    var spent = amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return "$" + spent;
}

function formatInput(event) {
    if (event.which >= 37 && event.which <= 40) return;
    this.value = this.value.replace(/[\D]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function getNumber(input) {
    var bankAccountBalance = parseFloat(input.replace(/,/g, ''));
    return bankAccountBalance;
} 

    
    













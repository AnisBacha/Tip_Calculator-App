
const inputs = document.querySelectorAll(".main__radio");
const labels = document.querySelectorAll(".main__label");
const customInput = document.querySelector(".main__custom");
const tipAmount = document.querySelector(".main__tipAmount");
const total = document.querySelector(".main__total");
const bill = document.querySelector("#bill");
const numberOfPeople = document.querySelector("#people");


let tipPercentage;


customInput.addEventListener("input", (event) =>{
    if(customInput.value){
        tipPercentage = customInput.value / 100;
    }
});
    
document.querySelector(".main__form").addEventListener("click", (event) =>{
    changeBgColor();
    checkNumberOfPeople();
    calculatePrice();
})



const changeBgColor = () =>{
    for(let i = 0 ; i<5 ; i++){
        if(inputs[i].checked){
            labels[i].style.backgroundColor = "hsl(172, 67%, 45%)";
            tipPercentage = inputs[i].value;
            for(let j =0 ; j<5 ; j++){
                if(j !== i){
                    labels[j].style.backgroundColor = "hsl(183, 100%, 15%)";
                }
                if(document.activeElement === customInput){
                    inputs[j].checked = false;
                    labels[j].style.backgroundColor = "hsl(183, 100%, 15%)";
                    if(customInput.value){
                        tipPercentage = customInput.value / 100;
                    }
                }
            }
          
        }
    }
    
}

const checkNumberOfPeople = () =>{
    let numberOfPeopleIsNotZero = false; 
    //CHECKING IF THE INPUT IS DOESN'T EQUAL ZERO
    //AND HANDLING ALL OF THE INPUT ELEMENT BORDER CHANGEs
    //WHILE THE USER TYPING
    numberOfPeople.addEventListener("input", (event) =>{
        const error = document.querySelector(".main__error");
        if(Number(numberOfPeople.value) === 0){
            error.style.display = "block";
            numberOfPeople.style.border = "1px solid orangered";
            numberOfPeopleIsNotZero = false;
        } else{
            numberOfPeopleIsNotZero = true;
            error.style.display = "none";
            numberOfPeople.style.border = "2px solid hsl(172, 67%, 45%)";
        }
    });
    // WHILE THE USER FOCUSING ON THE FIELD
    numberOfPeople.addEventListener("focus",(event) =>{
        if(numberOfPeopleIsNotZero){
            numberOfPeople.style.border = "2px solid hsl(172, 67%, 45%)";
        }
    });
    // WHILE THE FIELD IS OUT OF FOCUS
    numberOfPeople.addEventListener("blur", (event) =>{
        if(numberOfPeopleIsNotZero){
            numberOfPeople.style.border = "none";
        }
    });
}

const calculatePrice = () =>{

    if(bill.value !=="" && numberOfPeople.value !==""){
        const billFormat = /^(0|[1-9]\d*)(\.\d+)?$/;
        const peopleFormat = /^([1-9]\d*)$/;
        if(billFormat.test(bill.value) && peopleFormat.test(numberOfPeople.value)){
            const tip = Number(bill.value) * Number(tipPercentage) / Number(numberOfPeople.value);
            tipAmount.textContent = tip.toFixed(2);
    
            const totalPerPerson = Number(bill.value) / Number(numberOfPeople.value) + Number(tipAmount.textContent);
            total.textContent = totalPerPerson.toFixed(2);
        }
    } 
};


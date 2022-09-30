
const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const myPassword= resultEl.textContent;
    const textArea= document.createElement("textArea");

    if(!myPassword){
        return;
    }
    textArea.innerText= myPassword;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();

})

generateEl.addEventListener('click', () => {
    const length= +lengthEl.value;
    const haslower= lowercaseEl.checked;
    const hasupper= uppercaseEl.checked;
    const hasnumbers= numbersEl.checked;
    const hassymbol= symbolsEl.checked;
    // console.log(hassymbol);
    resultEl.innerText= generatePassword(haslower,hasupper, hasnumbers, hassymbol, length);
    // console.log(lower,upper);
})

function generatePassword(lower, upper, number, symbol, length) {
    //1. Initiate pw variable
    //2. Filter out unchecked types
    //3. loop over the length;
    //4. call generator function for each type
    //5. add final password to pw var and return

    let password= "";
    let typeCount= lower+ upper+ number+ symbol;
    
    if(typeCount==0){
        return "";
    }
    const typeArray= [ {lower}, {upper}, {number}, {symbol}];
    let filteredArr= typeArray.filter(element=> (Object.values(element)[0]));

    
    for (let index = 0; index < length; index+=typeCount) {
        
        filteredArr.forEach(type=>{
           let functionCall=  Object.keys(type)[0];
           password= password+ randomFunc[functionCall]();
        })
    }
    let finalPassword= password.slice(0,length);
    return finalPassword;
}


function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()*26)+97); 
    
    // here from 97, letter a starts and total letters are 26 so generation random lower case letters from 97 to 97+26. Fromcharcode is a method inside string which contains all lowercase ,uppercase, numbers, symbols in hexadecimal code.
}


function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()*26)+65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}

function getRandomSymbol() {
    let sym= "!@#$%^&*()_+{}[]:\/.,<>"
    return sym[Math.floor(Math.random()*sym.length)];
}

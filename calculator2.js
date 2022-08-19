let inner = document.querySelectorAll('.inner');
let num = document.querySelectorAll('.num');   // all the numbers in the calculator
let symbol = document.querySelectorAll('.symbol ');  // all the operators
let type = document.querySelector('.type');     // everytime we type something in the calculator, it will pop up here
let answer = document.querySelector('.answer');   // everytime we click on the equal sign, the answer will pop up here
let plus = document.querySelector('.plus');
let minus = document.querySelector('.minus');
let times = document.querySelector('.times');
let divi = document.querySelector('.divide');
let del = document.querySelector('.delete');
let equal = document.querySelector('.equal');
let clear = document.querySelector('.clear');
let decimal = document.querySelector('.decimal');
let str = '';  // everytime a number is pressed, it will be saved inside this string 
let sym = '';  // Everytime an operator is pressed, it will be saved inside this variable
let obj = {
    total: 0,   // everytime an evaluation is made, the total of that evaluation will be saved here
    a: 0,   
    b: 0
}

// Still busy with it
// This function is for keyboard support
window.addEventListener('keypress', e => {
    let key = document.querySelector(`div[data-key="${e.keyCode}"]`);
});



// This event listener is for when a number on the calculator is clicked on. It is going to save that number as a string and then display it on 
// the calculator
num.forEach((num) => {
    num.addEventListener('click', (e) => {
        str += e.target.textContent;  // everytime a number is pressed it will be save in this variable
        display(e);   // that number will be displayed 
    });
});


// This event listener is for when the '.' is pressed. It allows the user to use decimals when calculating. The user can only press it one at a 
// time, meaning we can't have two dots lined up like this e.g  '..'
decimal.addEventListener('click', e => {
    str += e.target.textContent;   // when the dot is pressed it will also be saved inside this variable
    display(e);    // the dot will be displayed
}, {once: true});  // This is how we make sure the dot is only pressed once at a time



// This event listener is for when one of the operators is clicked. This event listener saves the previous number that was entered when the 
// user clicks the operator for the first time and it also evaluates the two numbers entered if/when the user uses one of the operators the second 
// time
// The first time one of the operators is clicked, meaning the user only enetered one number so far, this event listener will save that number 
// inside obj.a
// When the user clicks one of the operators again, meaning two numbers were entered so far, e.g  1 + 2 + , the first two numbers will be 
// evaluated and then obj.a will be the evaluation of those two numbers and the second number entered will be obj.b
symbol.forEach((symbol) => {
    symbol.addEventListener('click', (e) => {
    answer.textContent = '';

    decimal.addEventListener('click', e => {
        str += e.target.textContent;
        display(e);
    }, {once: true});

    if(type.textContent == '-') {
        str += '-'
    } else if(/^[x/]/.test(type.textContent)) {
        return
    }
    else if(obj.a == 0) {
        obj.a = +str; // 0
        sym = e.target.textContent;
        type.textContent = `${obj.a}${sym}`
        str = '';
    } else {
        obj.b = +str;
        obj.total = operate(sym, obj.a, obj.b);
        obj.a = obj.total
        sym = e.target.textContent;
        type.textContent = `${obj.a}${sym}`
        str = '';
    }

   });
});



// This event listener is for when the equal sign is clicked. All it will do is evaluate obj.a(the value here can be the evaluation of many 
// different numbers) and obj.b and display the result on the calculator. It also rounds off any decimal numbers
equal.addEventListener('click', e => {
    obj.b = +str;
    obj.total = operate(sym, obj.a, obj.b);
    type.textContent = `${obj.a} ${sym} ${obj.b} =`
    if(/\/0/.test(type.textContent)) {
        let s = document.createElement('p');
        s.textContent = "Are you nuts?!! You can't divide by 0 you dummy";
        s.style.fontSize = '20px';
        s.style.color = 'rgb(245, 30, 30)';
        answer.append(s);
    } else if(/^[x/]/.test(type.textContent)) {
        answer.textContent = 'huh??';
    }
        else {
        answer.textContent = Number.isInteger(obj.total) ? operate(sym, obj.a, obj.b) : operate(sym, obj.a, obj.b).toFixed(2);
    }
});




// This function will clear all the data entered and reset everything and the calculator will start from scratch
clear.addEventListener('click', () => {
    obj = {
        total: 0,
        a: 0,
        b: 0
    };
    answer.textContent = '';
    type.textContent = '';
    sym = '';
    str = '';
});



function delet(str) {
    let s = str.split('');
    s[s.length - 1] = '';
    s = s.join('');
    return s
}




// Still busy with it
// This function  will delete the previous number or operator entered and the calculator will start from the time before the number or operator 
// was entered. 
del.addEventListener('click', e => {
    let st = answer.textContent;
    str = delet(str);
    answer.textContent = delet(st);
})




// This is the function that will e called every time we need to evaluate a pair of numbers
// This function will be run every time the user clicks on the equal sign or when there are two or more operators in the equation
// Everytime the operators are clicked 2 times or more, this function will be reun
// e.g   1 + 1 ,    the function in this case will not be run
// e.g   1 + 1 = ,  the function in this case will be run when we click the equal sign
// e.g   6 + 4 + ,  the function in this case will be run and will evaluate the number 6 and the number 4. Our result will be 10 
// e.g   6 + 4 - 5 = , the function in this case will be run twice. When the user clicks on the minus sign, and the user clicks the equal sign
// In the above example, the operate function will evaluate 6 and 4 first and the result(10) will be saved in obj.a and the opearate function 
// will run again when the = is clicked. obj.b will now be 5
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);

        case '-':
            return subtract(a, b);
            
        case 'x':
            return multiply(a, b);

        case '/':
            return divide(a, b);
    
        default:
            break;
    }
}



// This is the function that displays what needs to be displayed on the calculator
function display(e) {
    answer.textContent += e.target.textContent;
}


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}



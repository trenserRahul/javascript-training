// let multiply = function (x,y) {
//     console.log(x*y);
// }

// let multiplyByTwo = multiply.bind(this,2);

// let multiply = function (x) {
//     return function(y) {
//         console.log(x*y);
//     }
// }

// let multiplyByTwo = multiply(2);
// multiplyByTwo(3);

// let multiplyByThree = multiply(3);
// multiplyByThree(10);



// Bind function 

let multiply = function (x, y) {
    console.log(x * y);
}

let multiplyByTwo=multiply.bind(this,2);
multiplyByTwo(3);
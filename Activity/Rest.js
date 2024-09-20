const objectOne = {
    name: "rahul",
    age: 21,
    place: "ulloor"
}

function restExample() {
    const {
        name,
        ...others
    } = objectOne;

    console.log(name, others);
}

restExample();


const markArray = [1, 2, 3, 4];

// function restArrayExaple() {
//     const [ 
//         firstElement , 
//         ...otherElement
//     ]=markArray;
//     console.log(firstElement ,otherElement);
// }

// restArrayExaple();


function restArrayExaple() {
    const [
        a, b, c
    ] = markArray;
    console.log(a, b, c);
}

restArrayExaple();

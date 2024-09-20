const objectOne = {
    a: 1, b: 2, c: 3
};
const objectTwo = {
    d: 4, e: 5, f: 6
};

const objectThree = {
    ...objectOne, ...objectTwo
};

console.log(objectThree);
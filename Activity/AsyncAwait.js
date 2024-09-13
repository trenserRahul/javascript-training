const promiseOne = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise one resolved");
    }, 1000);
});

const promiseTwo = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise two resolved");
    }, 10000);
});

const promiseThree = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise three resolved");
    }, 20000);
});

async function handlingPromise() {
    console.log("hi");
    const firstPromise = await promiseOne;
    console.log(firstPromise);

    const secondPromise = await promiseTwo;
    console.log(secondPromise);
   
    const thirdPromise = await promiseThree;
    console.log(thirdPromise);
}

handlingPromise();
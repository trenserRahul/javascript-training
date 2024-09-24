// async function getData() {
//     return "Data";
// }

// const getDataPromise = getData();

// getDataPromise.then((res)=>console.log(res));

const newPromise = new Promise((resolve, reject)=>{
    resolve("Resolved Data");
    //reject("error");
})

async function getData() {
    return newPromise;
}

const getDataPromise = getData();
//console.log(getDataPromise);
getDataPromise.then((res)=>console.log(res));


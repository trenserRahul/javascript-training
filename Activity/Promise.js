getOrderId().then((orderId)=>{
    console.log(orderId);
    proceedOrder(orderId);
})
.then((promiseProceedOrder)=>console.log(promiseProceedOrder));


function getOrderId(){
   const promiseOrderId= new Promise((resolve , reject) => resolve("1234"));
   return promiseOrderId;
}

function proceedOrder(orderId) {
    const promiseProceedOrder= new Promise ((resolve, reject)=>resolve("Ordered Successfully"));
    return promiseProceedOrder;
}

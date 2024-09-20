const nameObjectA ={
     firstName : "Rahul",
     lastName : "B"
};

const nameObjectB ={
     firstName : "Umesh",
     lastName : "UI"
};

const printFulName = function () {
    console.log(this.firstName + " " + this.lastName);
}

printFulName.call(nameObjectA);
printFulName.call(nameObjectB);
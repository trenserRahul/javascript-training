const nameObjectA ={
    firstName : "Rahul",
    lastName : "B"
};

const nameObjectB ={
    firstName : "Umesh",
    lastName : "UI"
};

const printFulName = function (place) {
   console.log(this.firstName + " " + this.lastName + " " + place);
}

const printName = printFulName.bind(nameObjectA);
printFulName.call(nameObjectB);
printName("ulloor");
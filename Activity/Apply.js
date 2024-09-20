const nameObjectA = {
    firstName: "Rahul",
    lastName: "B"
};

const nameObjectB = {
    firstName: "Umesh",
    lastName: "UI"
};

const printFulName = function (place , state ) {
    console.log(this.firstName + " " + this.lastName + " " + place + " " + state);
}

testArray = ["ulloor" , "kerala"];
printFulName.apply(nameObjectA ,testArray);
printFulName.call(nameObjectB , "ulloor" , "kerala");
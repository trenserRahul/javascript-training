class Student {
    // name;
    // age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class StudentOne extends Student {

}

const objectOne = new StudentOne("HI", 21);
console.log(objectOne.name, objectOne.age);
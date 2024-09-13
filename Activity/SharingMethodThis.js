const student ={
    name:"Nandu",
    PrintName:function(){
        console.log(this.name);
    }
};

const studentTwo ={
    name:"Arun",
};

student.PrintName();
student.PrintName.call(studentTwo);
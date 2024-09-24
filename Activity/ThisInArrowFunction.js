const object={
    name:"RAHUL",
    displayName:()=>{
        console.log(this);
    }
};

object.displayName();

const objectTwo={
    name:"RAHUL",
    displayName:function(){
       const functionY= ()=>{console.log(this.name)}
       functionY();
}
};

objectTwo.displayName();

let globalVariableA = 1;
let same = 110;
function undeFinedAndNotDefinedError() {
    let d = 12;
    console.log(a);
    console.log(d);
    console.log(b);
    console.log(c);
    var a;
    const c = 1;
}

function lexicalEnvironment() {
    let lexicalParentA = 10;
    var lexicalParentB = 20;
    const lexicalEnvironmentC = 30;
    let same = 120;

    console.log("Global variable let " + globalVariableA);
    console.log("variable let inside lexical funct " + lexicalParentA);
    console.log("variable var inside lexical funct " + lexicalParentB);
    console.log("variable const inside lexical funct " + lexicalEnvironmentC);
    insideLexicalEnvironment();
    function insideLexicalEnvironment() {
        let insidelexicalParentA = 100;
        var insidelexicalParentB = 200;
        const insidelexicalEnvironmentC = 300;
       // let same = 130;
        console.log("Global variable let " + globalVariableA);
        console.log("variable let inside lexical funct " + lexicalParentA);
        console.log("variable var inside lexical funct " + lexicalParentB);
        console.log("variable const inside lexical funct " + lexicalEnvironmentC);

        console.log("variable let inside child funct " + insidelexicalParentA);
        console.log("variable var inside child funct " + insidelexicalParentB);
        console.log("variable const inside child funct " + insidelexicalEnvironmentC);

        console.log("Same variable name : " + same)
    }
}
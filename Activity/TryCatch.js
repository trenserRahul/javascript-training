try {
    const variableOne = getName();
    console.log(variableOne);
    const variableTwo = getPlace();
    console.log(variableTwo);
} catch (error) {
    console.log(error);
    // console.log("hi");
} finally {
    console.log("Finally block");
}

function getName() {
    //throw ("My Error");
    throw new Error("Created error");
    return "Rahul";
}
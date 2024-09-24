
const postObject = {
    name: "Rahul",
    place: "Ulloor",
}

async function fetchFunction() {

    const postFetch = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(postObject),
        headers: {
            "Content-type": "application/json"
        }
    })
    const test = await postFetch.json()

    console.log(test);

}
fetchFunction();
getFunction();

async function getFunction() {
    const getFetch = await fetch("https://jsonplaceholder.typicode.com/posts/"+2)
    const fetchedObject = await getFetch.json()
    console.log(fetchedObject);
    console.log(fetchedObject.body);
}
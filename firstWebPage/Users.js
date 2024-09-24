const userId = document.getElementById("user-id");
const title = document.getElementById("title");
const body = document.getElementById("body");

async function fetchData() {
    const searchId = document.getElementById("search-user").value;
    const fetchedData = await fetch(`https://jsonplaceholder.typicode.com/posts/${searchId}`)
    const jsonData = await fetchedData.json()
    displayFetchedData(jsonData);
}

function displayFetchedData(jsonData) {
    userId.value = jsonData.id;
    title.value = jsonData.title;
    body.value = jsonData.body;
}
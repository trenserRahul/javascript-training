window.onload = () => {
    fetchData();
}

async function fetchData() {
    const fetchedData = await fetch("https://jsonplaceholder.typicode.com/posts")
    const jsonData = await fetchedData.json()
    displayFetchedData(jsonData);
}

function displayFetchedData(jsonData) {
    let table = '<table>';
    table += '<tr><th>User Id </th><th>Title</th><th>Body</th></tr>';
    jsonData.forEach(data => {
        table += `<tr> <td>${data.id}</td> <td>${data.title}</td> <td>${data.body}</td></tr>`;
    });
    table += '</table>';
    const tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = table;
}


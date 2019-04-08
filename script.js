//API key variable not needed, kept for future updates
let API_KEY = 'AIzaSyAtaFaElcUouUKFILmLK_2ErBMpzneBcYU';

//Initialising variables
let btn = document.getElementById("btn");
const container = document.getElementsByClassName("container");
const table = document.getElementById("myTable");
table.setAttribute("id", "myTable");

function searchBooks(){
    //query is search box
    let query = document.getElementById("query").value;

    //Re-Initialises table and headers
    table.innerHTML = "";
    const heading = table.createTHead();
    const head1 = document.createElement("TH");
    head1.innerHTML = "Title";
    heading.appendChild(head1);

    const head2 = document.createElement("TH");
    head2.innerHTML = "Author(s)";
    heading.appendChild(head2);

    const head3 = document.createElement("TH");
    head3.innerHTML = "Date Published";
    heading.appendChild(head3);

    const head4 = document.createElement("TH");
    head4.innerHTML = "Link";
    heading.appendChild(head4);

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}+inauthor:${query}`)
        .then(data => data.json())
        .then(data => {
            
            data.items.forEach((book) => {
                
                var row = heading.insertRow();

                var cell1 = row.insertCell();
                cell1.innerHTML = `${book.volumeInfo.title}`;

                let authors = book.volumeInfo.authors.join(", ");
                var cell2 = row.insertCell();
                cell2.innerHTML = `${authors}`;

                let date = `${book.volumeInfo.publishedDate}`
                if(date == "undefined") date = 'Unknown';
                var cell3 = row.insertCell();
                cell3.innerHTML = `${date}`;

                var cell4 = row.insertCell();
                cell4.innerHTML = `<a href="${book.volumeInfo.previewLink}">Link</a>`;

            });
        })
        .catch(err => console.log(err));
}

btn.addEventListener("click", searchBooks);
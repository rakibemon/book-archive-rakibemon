const inputField = document.getElementById('input-text');
// add event handler on search button
document.getElementById('search-button').addEventListener('click', () => {
    // make display clear on every search
    document.getElementById("books-container").textContent = "";
    document.getElementById("empty-error").textContent = "";
    document.getElementById('books-counter').textContent = ''
    document.getElementById("error-message").classList.add('d-none');
    const emptyError = document.getElementById('empty-error');
    if (inputField.value.length > 0) {
        document.getElementById('spinner').classList.remove('d-none');
        fetch(`https://openlibrary.org/search.json?q=${inputField.value}`)
            .then(response => response.json())
            .then(data => displayBook(data.docs))
    }
    if (inputField.value.length === 0) {
        document.getElementById("error-message").classList.add('d-none')
        const div = document.createElement('div');
        div.innerHTML = `<h3> Please Enter a Book Name </h3>`
        div.classList.add('empty-error');
        emptyError.appendChild(div)
    }

    inputField.value = ''
});
// function to display books card
const displayBook = (books) => {
    const booksContainer = document.getElementById('books-container');
    const h4 = document.createElement('h4');
    h4.innerHTML = ` Showing result of - ${books.length}`
    h4.classList.add('text-center', 'mt-4');
    document.getElementById('books-counter').appendChild(h4)
    if (books.length === 0) {
        errorMessage()
    }
    else {
        books.forEach(book => {
            document.getElementById("error-message").classList.add('d-none')
            const { cover_i, title, author_name, first_publish_year, publisher } = book;
            const div = document.createElement('div')
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100">
    <figure> <img src="https://covers.openlibrary.org/b/id/${cover_i ? cover_i:10909258}-M.jpg" class="card-img-top text-center img-thumbnail img-fluid" alt="Book Image"></figure>
    <div class="card-body">
      <h5 class="card-title">${title ? title : 'no data found'}</h5>
      <p> <b>Author Name :</b> ${author_name ? author_name : "No author name found"}</p>
      <p> <b>First publish Year :</b> ${first_publish_year ? first_publish_year : 'no data found'}</p>
      <p> <b>Publisher : </b> ${publisher ? publisher : 'no data found'}</p>
    </div>
  </div>`

            booksContainer.appendChild(div)
        })
    }
    document.getElementById('spinner').classList.add('d-none');


}
// function to show if search named book ain't available
const errorMessage = () => {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = ` <div class="card m-auto p-5 bg-danger text-white" style="width: 18rem">
            <h5 class="card-title">Dear Sir/Ma'am,</h5>
            <p class="card-text">
              Your search did not match any of our book name. Please enter a
              correct name.
            </p>
          </div>`;
    errorMessage.classList.remove('d-none')
};
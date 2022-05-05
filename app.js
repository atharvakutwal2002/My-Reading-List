// book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  //create tr element
  const row = document.createElement("tr");
  //inserting cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete"> X <a></td>
    `;

  list.appendChild(row);
};

//show alerts
UI.prototype.showalert= function(message, className){
    //create div
    const div= document.createElement('div');
    // add classes
    div.className= `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container= document.querySelector('.container');
    const form= document.querySelector('#book-form');
    container.insertBefore(div,form);
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}

UI.prototype.deleteBook=function(target){
    if (target.className==='delete') {
        target.parentElement.remove();
    }
}


//clear fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  console.log("test");
  //get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn");
  //Instantiating a book
  const book = new Book(title, author, isbn);

  //Instantiate UI

  const ui = new UI();

  

  //validate
  if (title === "" || author === "" || isbn === "") {
    ui.showalert("Please enter all fields");
  } else {
    // add book to list
    ui.addBookToList(book);

    //show success
    ui.showalert('Book Added', 'success');

    //clear fields
    ui.clearFields();
  }

  e.preventDefault();
});


//event listener for deleting book list

document.getElementById('book-list').addEventListener('click',function(e){

    const ui=new UI();
    ui.deleteBook(e.target);
    ui.showalert('Book removed','success');
    e.preventDefault();
})
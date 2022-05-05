// class Book {
//   constructor(title, author, isbn) {
//     this.title = title;
//     this.author = author;
//     this.isbn = isbn;
//   }
// }

// class UI {
//   addBookToList(book) {
//     const list = document.getElementById("book-list");
//     //create tr element
//     const row = document.createElement("tr");
//     //inserting cols
//     row.innerHTML = `
//             <td>${book.title}</td>
//             <td>${book.author}</td>
//             <td>${book.isbn}</td>
//             <td><a href="#" class="delete"> X <a></td>
//             `;

//     list.appendChild(row);
//   }
//   showAlert(message, className) {
//       //create div
//     const div= document.createElement('div');
//     // add classes
//     div.className= `alert ${className}`;
//     // add text
//     div.appendChild(document.createTextNode(message));
//     //get parent
//     const container= document.querySelector('.container');
//     const form= document.querySelector('#book-form');
//     container.insertBefore(div,form);
//     setTimeout(function(){
//         document.querySelector('.alert').remove();
//     },3000);
//   }
//   deleteBook(target) {
//     if (target.className==='delete') {
//         target.parentElement.remove();
//     }
//   }
//   clearFields() {
//     document.getElementById("title").value = "";
//     document.getElementById("author").value = "";
//     document.getElementById("isbn").value = "";
//   }
// }

// //Event Listeners
// document.getElementById("book-form").addEventListener("submit", function (e) {
//     console.log("test");
//     //get form values
//     const title = document.getElementById("title").value,
//       author = document.getElementById("author").value,
//       isbn = document.getElementById("isbn");
//     //Instantiating a book
//     const book = new Book(title, author, isbn);

//     //Instantiate UI

//     const ui = new UI();

//     //validate
//     if (title === "" || author === "" || isbn === "") {
//       ui.showalert("Please enter all fields");
//     } else {
//       // add book to list
//       ui.addBookToList(book);

//       //show success
//       ui.showalert('Book Added', 'success');

//       //clear fields
//       ui.clearFields();
//     }

//     e.preventDefault();
//   });

//   //event listener for deleting book list

//   document.getElementById('book-list').addEventListener('click',function(e){

//       const ui=new UI();
//       ui.deleteBook(e.target);
//       ui.showalert('Book removed','success');
//       e.preventDefault();
//   })

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement("tr");
    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
      `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".container");
    // Get form
    const form = document.querySelector("#book-form");
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//local storage class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function (book) {
      const ui = new UI();
      // add book to UI
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books= Store.getBooks();
    books.forEach(function (book,index) {
        if (book.isbn===isbn) {
            books.splice(index,1);
        }
      });
      localStorage.setItem("books", JSON.stringify(books));
  }
}

//DOM load event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event Listener for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  console.log(ui);

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    //add to local storage
    Store.addBook(book);

    // Show success
    ui.showAlert("Book Added!", "success");

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  //remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show message
  ui.showAlert("Book Removed!", "success");

  e.preventDefault();
});

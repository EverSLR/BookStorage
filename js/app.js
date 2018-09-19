//Hasta aqui jala todo
//Classes
    class Book{
        constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        }
    }

    class UI{
        addBookToList(book) {
            //Create Node to insert to Table
            const list = document.getElementById("book-list");
            const row = document.createElement("tr");

            //Insert row to Table
            row.innerHTML = `<td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class= "delete">:d</a></td>`;
            list.appendChild(row);
        };

        clearFields() {
            document.getElementById("title").value = "";
            document.getElementById("author").value = "";
            document.getElementById("isbn").value = "";
        };

        deleteBook(target) {
            if(target.className === "delete") {
                target.parentElement.parentElement.remove();
            }
        };

        showAlert(message, className) {
            //Create Div element
            const div = document.createElement("div");
            div.className = `alert ${className}`;
            div. innerText = message;
    
            //Get parent to insert node
            const container = document.querySelector(".container");
            const form = document.querySelector("#book-form");
            container.insertBefore(div,form);
    
            setTimeout(function() {
                document.querySelector(".alert").remove();
            }, 3000);
        };
        

    }

//Events
    const bookForm = document.getElementById("book-form");
    bookForm.addEventListener("submit",handlerSubmit);

        function handlerSubmit(e) {

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const isbn = document.getElementById("isbn").value;
        const book = new Book(title,author,isbn);
        console.log(book);

        const ui = new UI();

        if(title !== "" && author !== "" && isbn !== "") {

            ui.addBookToList(book);
            Store.addBook(book);
            
            ui.clearFields();
        } 
        else {
            ui.showAlert("Alerta: campos no llenados!","error");
        }
        e.preventDefault();
    }

let books;

window.addEventListener("load", function(e) {
    books = Store.getBooks();
    Store.displayBooks();
});

document.getElementById("book-list").addEventListener("click", function(e) {
    console.log("click!")
    let ui = new UI();
    ui.deleteBook(e.target);
    console.log(e.target.parentElement.previousElementSibling.innerText)
    ui.showAlert("Book Removed", "success");
    Store.removeBook(e.target.parentElement.previousElementSibling.innerText);
    e.preventDefault();
});

// Local Storage Class
class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach(function(book){
        const ui  = new UI;
  
        // Add book to UI
        ui.addBookToList(book);
      });
    }
  
    static addBook(book) {
      const books = Store.getBooks();
  
      books.push(book);
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach(function(book, index){
       if(book.isbn === isbn) {
        books.splice(index, 1);
       }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
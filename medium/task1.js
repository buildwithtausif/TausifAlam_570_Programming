/* 

Library Book Management (In-Memory)
Create a program where a user can:
•	Add books (title, author)
•	Search book by title
•	Show all books
You don’t need a database, just keep data in memory (using List or Map).
Structuring data, Lists, OOP

Author: Tausif Alam
**** Use Node.js to run this javascript :)

*/

// readline module for interactive CLI 
const readln = require('node:readline');


// Library Classes
class Books {
    constructor (title, author) {
        this.title = title;
        this.author = author;
    }
}
class Library {
    constructor () {
        this.books = [];
    }

    // add books to library
    addBooks(title,author) {
        const book = new Books(title, author);
        this.books.push(book);

        // prompt 
        console.log(`😍 reader's now have a new book by, ${author}`);
    }

    // search for books by title
    searchBook(title) {
        const result = this.books.filter(book => {
           return book.title.toLowerCase().includes(title.toLowerCase());
        });

        if (result.length > 0) {
            result.forEach(item => {
                console.log(`Found 🤞😊 books relating to your query: ${item.title} by ${item.author}`)
            })
        } else {
            console.log("No Books Found 🙅🚫");
        }
    }

    // showAllBooks
    showAllBooks(title, author) {
        if (this.books.length > 0) {
            console.log("Available Books 👇");
            this.books.forEach((b, index) => {
            console.log(`${index+1}. ${b.title} -by ${b.author}`);
            })
        } else {
            console.log("Donate some books! No books available 🚫")
        }
    }
}

// create instance of library
const library = new Library();
// create instance of readline
const rl = readln.createInterface({
    input: process.stdin,
    output: process.stdout
});

function appMenu() {
    console.log(`
    =========================
    📚 Reader's Library Admin 📚
    =========================
    1. Add Book
    2. Search Book by Title
    3. Show All Books
    4. Exit
    `);

    // prompt user for choice
    rl.question("Choose an option (1-4): ", (choice) => {
        switch (choice) {
            case "1":
                 rl.question("Enter Book Title: ", (title) => {
                    rl.question("Enter Author Name: ", (author) => {
                        library.addBooks(title,author);
                        setTimeout(() => {
                            appMenu();
                        }, 500);
                    });
                 });
                break;
            case "2": 
                 rl.question("Please enter book title to search: ", (title) => {
                    library.searchBook(title);
                    setTimeout(() => {
                        appMenu();
                    }, 500);
                 });
                break;
            case "3":
                library.showAllBooks();
                setTimeout(() => {
                    appMenu();
                }, 500);
                break;
            case "4":
                console.log("Have a gr8 😍 read! byee :)");
                rl.close();
                break;
        }
    });
}appMenu();
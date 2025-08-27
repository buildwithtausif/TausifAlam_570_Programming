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

// stdio interface using nodejs 
const readln = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readln.createInterface({ input, output });

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
            book.title.toLowerCase().includes(title.toLowerCase());
        });

        if (result.length > 0) {
            result.forEach(item => {
                console.log(`Found books relating to your query: ${item.title} by ${item.author}`)
            })
        } else {
            console.log("No Books Found 🙅🚫");
        }
    }

    // showAllBooks
    showAllBooks(title, author) {
        if (this.books.length > 0) {
            this.books.forEach((b, index) => {
            console.log("Available Books 👇");
            console.log(`${index+1}. ${b.title} -by ${b.author}`);
            })
        } else {
            console.log("Donate some books! No books available 🚫")
        }
    }
}
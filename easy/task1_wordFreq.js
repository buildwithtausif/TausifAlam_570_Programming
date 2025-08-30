/*
Word Frequency Counter
Take a paragraph of text as input and print the top 3 most frequent words.
HashMap, Sorting, Strings

Author: Tausif Alam
**** Use Node.js to run this javascript :)
*/

// readline module for user-input
const readln = require('node:readline');
// create instance of readline
const rl = readln.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Please enter some paragraph... : ", (r_string) => {
    // match any character that is not a word or whitespace then split it into an array at at every instance of whitespace
    let words = r_string.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);

    // make map of words, words as keys and their occurence as value
    let frequency = {};
    words.forEach(word => {
        frequency[word] = ((frequency[word] || 0) + 1)
    });

    // create another array out of frequency object and sort it according to key:value occurence [1]
    const s_val = Object.entries(frequency).sort((a,b) => b[1] - a[1]);

    // take sorted value from postion 0 till 3, 3 not included , so it gives 3 most frequent words
    const top3_words = s_val.slice(0,3)
    console.log("Most Frequent word is: ", top3_words);
    rl.close();
    process.exit(0);
});
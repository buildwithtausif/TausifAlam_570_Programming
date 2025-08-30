/*
CLI Quiz App
Make a console-based quiz program. User should answer 5 multiple-choice questions, and the final score should be shown.
Arrays/Lists, Input handling, Conditional logic

Author: Tausif Alam

**** Use Node.js to run this javascript :)
*/

// readline module for user-input
const { error } = require("node:console");
const readln = require("node:readline");
// create instance of readline
const rl = readln.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// my idea is to not hardcode question but to get them with their answers from somewhere else in node
/* 
    rules are like,
    attempt any five questions out of 7
    maximum marks to be 50 i.e 5x10 = 50, 7x10 = 70


    for that i need to create an api-pipeline to access respone right into terminal
*/

async function getQuestions() {
  const source = "https://opentdb.com/api.php?amount=10&category=18"; // tech related questionaire
  try {
    const response = await fetch(source);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
    process.exit(0) // end node-process
  }
}
getQuestions();

/* 
ohk so now we have an entire questions with answer key now let's structure our data for cli
*/

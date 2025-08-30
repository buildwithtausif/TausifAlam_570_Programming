/*
CLI Quiz App
Make a console-based quiz program. User should answer 5 multiple-choice questions, and the final score should be shown.
Arrays/Lists, Input handling, Conditional logic

Author: Tausif Alam

**** Use Node.js to run this javascript :)
*/

//kbc-feel
const path = require("path");
const sound = require("sound-play");

function playSound(filename) {
  const filePath = path.join(__dirname, "sounds", filename);
  return new Promise((resolve, reject) => {
    sound
      .play(filePath)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
}
// readline module for user-input
const readln = require("node:readline");

// for colors inside terminal
const colors = require("colors");

// for ascii-art
const figlet = require("figlet");
// headding for CLI app
figlet("CLI Quiz", function (err, data) {
  playSound("intro.mp3");
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data.brightGreen);
});

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
  const source = "https://opentdb.com/api.php?amount=5&category=18"; // tech related questionaire
  try {
    const response = await fetch(source);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const parsed_data = await response.json();
    return parsed_data.results; // only return the questions
  } catch (error) {
    console.error(error.message);
    process.exit(0); // end node-process
  }
}

/* 
ohk so now we have an entire questions with answer key now let's structure our data for cli
*/

async function main() {
  const questions = await getQuestions(); //get questions before moving ahead in operations
  startQuiz(questions); //pass question set to another funtion
}
main();

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startQuiz(questions) {
  let score = 0;
  let index = 0;
  playSound("kbc_question.mp3"); //play question sound
  function ask() {
    if (index < questions.length) {
      const q = questions[index];
      const options = shuffle([q.correct_answer, ...q.incorrect_answers]);

      console.log(`\nQ${index + 1}: ${q.question}`);
      options.forEach((element, i) => {
        console.log(`${i + 1}. ${element}`);
      });

      rl.question("Please select your answer (1-4): ", (answer) => {
        const choice = options[parseInt(answer) - 1];
        if (choice === q.correct_answer) {
          score += 10;
          console.log("Yayy! correct answer".brightYellow);

          index++;
          //delay for proper sync with sound
          playSound("kbc_question.mp3");
          setTimeout(()=> {
              ask();
          },3000);
        } else {
          console.log("You lose! 🙅".bgBrightRed);
          console.log(`Your score: ${score}`);
          rl.close();
          process.exit(0);
        }
      });
    } else {
      console.log(`\nQuiz finished! Your score: ${score}`);
      rl.close();
      process.exit(0);
    }
  }

  //delay for proper sync with sound
  setTimeout(() => {
    ask();
  }, 14000);
}

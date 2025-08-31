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
// readline module for user-input
const readln = require("node:readline");
// for colors inside terminal
const colors = require("colors");

function playSound(filename) {
  const filePath = path.join(__dirname, "sounds", filename);
  sound.play(filePath);
}
// for ascii-art
const figlet = require("figlet");
// headding for CLI app
figlet("Kaun Banega Crorepati", function (err, data) {
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
// for that i need to create an api-pipeline to access respone right into terminal

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

// randomize the order of choices
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// quiz function
function startQuiz(questions) {
  let score = 0;
  let index = 0;
  playSound("kbc_question.mp3"); //play question sound for index 0
  function ask() {
    if (index < questions.length) {
      const q = questions[index];
      const options = shuffle([q.correct_answer, ...q.incorrect_answers]);

      console.log(`\nQ${index + 1}: ${q.question}`);
      options.forEach((element, i) => {
        console.log(`${i + 1}. ${element}`);
      });
      // take user input using readline
      rl.question("Please select your answer (1-4): ", (answer) => {
        const choice = options[parseInt(answer) - 1];
        if (choice === q.correct_answer) {
          score += 10;
          console.log("Yayy! correct answer".brightYellow);

          // increment the index in order to get different question instead of getting same question each time
          index++;
          //kbc_question sound
          if (index < 5) {
            // play this only if the index is less than 5 coz, at 5th index we need to play 7 crore.mp3
            playSound("kbc_question.mp3");
          } else {
            playSound("7cr.mp3");
          }
          // delay for sound-sync
          setTimeout(() => {
            ask();
          }, 3000);
        } else {
          // play this sound for every wrong answer
          playSound("kbc_wrong.mp3");
          // delay for proper sync with sound
          setTimeout(() => {
            figlet(`You lose!!! Score: ${score}`, function (err, data) {
              if (err) {
                console.log("Something went wrong...");
                console.dir(err);
                return;
              }
              console.log(data.brightRed);
            });
            rl.close();
            process.exit(0); //exit node process
          }, 2500);
        }
      });
    } else {
      // 7 crore
      figlet(`7 Crore!!!  Score: ${score}`, function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(data.brightBlue);
      });
      rl.close();
      process.exit(0); //exit node process
    }
  }

  //delay for proper sync with sound (intro sound)
  setTimeout(() => {
    ask();
  }, 14000);
}

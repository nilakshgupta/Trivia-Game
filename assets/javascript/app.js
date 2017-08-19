
var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question: "Who was Winston Churchill referencing when he said 'My dear, you are ugly, but tomorrow I shall be sober, and you will still be ugly'.? ",
  answers: ["Hisa Laminton", "Rebecca Shougar", "Bessie Braddock", "Hiffany Tethers"],
  correctAnswer: "Bessie Braddock",
  image: "assets/images/bessie.jpg"
}, {
  question: "What staple food, tainted with melamine, poisoned at least 53,000 children in China by Sept. 2008?",
  answers: ["Rice", "Wheat", "Eggs", "Milk"],
  correctAnswer: "Milk",
  image: "assets/images/milk.jpg"
}, {
  question: "In a deck of playing cards, which real-life king is represented by the King Hearts?",
  answers: ["Alexander The Great", "King David", "Julius Caesar", "Charlemagne"],
  correctAnswer: "Charlemagne",
  image: "assets/images/kingofhearts.jpg"
}, {
  question: "In Minnesota it is illegal to tease what type of animal?",
  answers: ["Elephant", "Deer", "Racoon", "Skunk"],
  correctAnswer: "Skunk",
  image: "assets/images/skunk.jpg"
}, {
  question: "On average, what do you do 15 times a day? ",
  answers: ["Laugh", "Break Wind", "Lick your Lips", "Burp"],
  correctAnswer: "Laugh",
  image: "assets/images/laugh.png"
}, {
  question: "How many copies must an album sell to be certified as platinum in the U.S.?",
  answers: ["1 Million", "10 Million", "100 Million", "Anything above 100,000"],
  correctAnswer: "1 Million",
  image: "assets/images/million.jpg"
}, {
  question: "Which country presented the Statue of Liberty to the United States?",
  answers: ["England", "Spain", "France", "India"],
  correctAnswer: "France",
  image: "assets/images/france.jpg"

}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    panel.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").html(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});

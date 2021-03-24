// CONSTANTS
const page1 = document.getElementById("mode");
const page2 = document.getElementById("turn");
const page3 = document.getElementById("punish");
const page4 = document.getElementById("task");
const page5 = document.getElementById("game-over");

let isDenied = false;

let deniedGirl = 0;
let deniedBoy = 0;
let toGameOver = 5;

const players = ["boy", "girl"];
const tasks = {
  boy: [
    "Съесть сырую картошку",
    "Потанцевать",
    "Кукарекать 30 секунд",
    "Стоять на голове",
    "Приготовить обед",
    "Скорчить рожицу",
    "Пошутить",
    "Помыть посуду",
    "Сделать мем",
    "Говорить минуту смешным голосом",
  ],
  girl: [
    "Съесть сырую картошку",
    "Потанцевать",
    "Кукарекать 30 секунд",
    "Стоять на голове",
    "Приготовить обед",
    "Скорчить рожицу",
    "Пошутить",
    "Помыть посуду",
    "Сделать мем",
    "Говорить минуту смешным голосом",
  ],
};

let mode = "victory";
let player = "girl";
let punishment = "";

const startButton = document.querySelector(".start");
const modeSelect = document.getElementById("mode-select");
const taskCountSelect = document.getElementById("tasks-count");
const playerButtons = Array.from(
  document.getElementById("player-choise").children
);
const homeButtons = Array.from(document.getElementsByClassName("home"));
const punishMessage = document.getElementById("punish-message");
const submitPunishButton = document.querySelector(".submit-data");
const punishResult = document.getElementById("punish-result");
const punishBlock = document.querySelector(".punish-block");
const currentPlayer = document.querySelector(".current-player");
const taskMessage = document.getElementById("task-message");
const failButton = document.querySelector(".fail");
const completeButton = document.querySelector(".complete");
const winner = document.querySelector(".winner");

// EVENTS

startButton.addEventListener("click", () => openPage(page1, page2));

homeButtons.forEach((el) => {
  const parent = el.closest("section");
  el.addEventListener("click", () => {
    openPage(parent, page1);
    resetGame();
  });
});

playerButtons.forEach((el) => {
  el.addEventListener("click", choosePlayer);
});

modeSelect.addEventListener("click", chooseMode);
taskCountSelect.addEventListener("click", chooseTaskCount);
submitPunishButton.addEventListener("click", savePunishment);
completeButton.addEventListener("click", updateTasks);
failButton.addEventListener("click", failTask);

//FUNTIONS

function openPage(page1, page2) {
  page1.style.display = "none";
  page2.style.display = "block";
}

function chooseMode(event) {
  const useChoice = event.target.value;
  if (useChoice === "Бесконечный") {
    mode = "infinite";
    taskCountSelect.style.display = "none";
  } else {
    mode = "victory";
    taskCountSelect.style.display = "inline";
  }
}

function chooseTaskCount(event) {
  const userChoice = event.target.value;
  toGameOver = parseInt(userChoice) * 2 + 1;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array[array.length - 1];
}

function choosePlayer(event) {
  const userChoice = event.target.innerText;
  switch (userChoice) {
    case "Девушка":
      player = "girl";
      break;

    case "Парень":
      player = "boy";
      break;

    case "Случайно":
      player = shuffleArray(players);
      break;
  }
  openPage(page2, page3);
}

function savePunishment(event) {
  event.preventDefault();
  const inputLength = punishMessage.value.length;
  if (inputLength > 0) {
    punishBlock.style.display = "none";
    punishment = punishMessage.value;
    punishResult.value = punishMessage.value;
    updateTasks(event);
    openPage(page3, page4);
  }
}

function updateTasks(event) {
  isDenied = false;
  if (event) {
    event.preventDefault();
  }
  player === "girl"
    ? (currentPlayer.innerHTML = "ОНА:")
    : (currentPlayer.innerHTML = "ОН:");
  punishBlock.style.display = "none";
  taskMessage.value = shuffleArray(tasks[player]);
  if (mode === "victory") {
    toGameOver--;
    if (toGameOver === 0) {
      setGameResults();
      openPage(page4, page5);
    }
  }
  console.log(toGameOver);

  if (player === "girl") {
    player = "boy";
  } else {
    player = "girl";
  }
}

function failTask(event) {
  event.preventDefault();
  punishBlock.style.display = "block";
  if (!isDenied) {
    player === "girl" ? deniedBoy++ : deniedGirl++;
  }
  isDenied = true;
}

function setGameResults() {
  if (deniedGirl > deniedBoy) {
    winner.innerText = "Он победил";
  } else if (deniedGirl < deniedBoy) {
    winner.innerText = "Она победила";
  } else {
    winner.innerText = "Ничья!";
  }
}

function resetGame() {
  deniedGirl = 0;
  deniedBoy = 0;
  toGameOver = 5;
}

console.log("Welcome to Tic Tac Toe");

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

let turn = "X";
let isGameOver = false;
let statusText = document.getElementById("statusText");
let boxes = document.getElementsByClassName("box");
let imgBox = document.querySelector(".imgbox img");

// Function to change turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    wins.forEach(e => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            isGameOver = true;
            let winner = boxtext[e[0]].innerText;
            statusText.innerText = winner + " Won!";
            statusText.style.backgroundColor = "green";
            gameover.play();
            imgBox.style.width = "200px";

            // Apply win animation
            e.forEach(i => {
                boxtext[i].parentElement.classList.add("win");
            });
        }
    });
};

// Game Logic
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (!isGameOver && boxtext.innerText === "") {
            boxtext.innerText = turn;
            boxtext.classList.add(turn === "X" ? "red" : "blue");

            audioTurn.play();
            checkWin();

            if (!isGameOver) {
                turn = changeTurn();
                statusText.innerText = "Turn for " + turn;
                statusText.style.backgroundColor = turn === "X" ? "red" : "blue";
            }
        }
    });
});

// Reset Game
document.getElementById("reset").addEventListener("click", () => {
    Array.from(boxes).forEach(element => {
        element.querySelector(".boxtext").innerText = "";
        element.classList.remove("win");
    });

    turn = "X";
    isGameOver = false;
    statusText.innerText = "Turn for X";
    statusText.style.backgroundColor = "red";
    imgBox.style.width = "0px";
});

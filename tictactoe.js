/* Creating Board via Factory Function Method*/
function BoardFactory() {
    console.log("Board Factory Activated")
    var array = [];
    const createBoardGame = () => {
        for (let i = 0; i <= 2; i++) {
            array[i] = [];
            for (let k = 0; k <= 2; k++) {
                array[i][k] = null;
            }
        }
    };
    return {
        createBoardGame,
        getBoard: () => array
    };
};


function Player() {
    const basePlayer = "X"
    let currentPlayer = "X";

    const switchPlayer = () => {
        currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X";
    }
    return {
        switchPlayer,
        getCurrentPlayer: () => currentPlayer,
        getBasePlayer: () => basePlayer
    }
}


/* Creating Game Logic */
function checkWinning() {

    //check row
    const horizontalWinningCheck = (boardGame, current) => {
        for (let i = 0; i < 3; i++) {
            if (boardGame[0][i] === current &&
                boardGame[1][i] === current &&
                boardGame[2][i] === current) {
                return true;
            }
        }
    }
    //check column
    const verticalWinningCheck = (boardGame, current) => {
        for (let i = 0; i < 3; i++) {
            if (boardGame[i][0] === current &&
                boardGame[i][1] === current &&
                boardGame[i][2] === current) {
                return true;
            }
        }
    }

    const diagonalWinningCheck = (boardGame, current) => {
        // check diagonal / way
        if (boardGame[0][0] === current &&
            boardGame[1][1] === current &&
            boardGame[2][2] === current) {
            return true;
        }

        if (boardGame[0][2] === current &&
            boardGame[1][1] === current &&
            boardGame[2][0] === current) {
            return true;
        }
    }
    return {
        horizontalWinningCheck,
        verticalWinningCheck,
        diagonalWinningCheck
    }
}


// verifying
function AcceptUserInput() {
    const writeToArray = (cell, boardGame, player) => {
        if (cell.getAttribute('id') == "cell-1") {
            boardGame.getBoard()[0][0] = player;
        } else if (cell.getAttribute('id') == "cell-2") {
            boardGame.getBoard()[0][1] = player;
        } else if (cell.getAttribute('id') == "cell-3") {
            boardGame.getBoard()[0][2] = player;
        } else if (cell.getAttribute('id') == "cell-4") {
            boardGame.getBoard()[1][0] = player;
        } else if (cell.getAttribute('id') == "cell-5") {
            boardGame.getBoard()[1][1] = player;
        } else if (cell.getAttribute('id') == "cell-6") {
            boardGame.getBoard()[1][2] = player;
        } else if (cell.getAttribute('id') == "cell-7") {
            boardGame.getBoard()[2][0] = player;
        } else if (cell.getAttribute('id') == "cell-8") {
            boardGame.getBoard()[2][1] = player;
        } else if (cell.getAttribute('id') == "cell-9") {
            boardGame.getBoard()[2][2] = player;
        }
    }
    return {
        writeToArray
    }
}

function displayResult() {
    const resultContainer = document.querySelector('#result-container');
    
    const setDisplay = (winner) => {
        resultContainer.innerText = "Player " + winner + " win";
    }

    const resetDisplay = () => {
        resultContainer.innerText = "";
    }
    return {
        setDisplay,
        resetDisplay
    }
}

function gameControl() {
    const start = document.getElementById("play-btn");

    const startButtonAction = () => {
        start.addEventListener("click", () => {
            console.log("Start button clicked");
            TicTacToe();
            start.disabled = true;
        })
    }

    return {
        startButtonAction,
    }
}

// The Game
function TicTacToe() {
    console.log("Start Tic tac toe")
    let player = Player();
    let mark = AcceptUserInput();
    let boardGame = BoardFactory();
    boardGame.createBoardGame();
    console.log("Board Game Created In TIC TAC TOE")
    let checkWinner = checkWinning();
    let moveCount = 1;
    let displayOutcome = displayResult();

    /* --------------------------------USER INTERACTION AND DATA DISPLAY------------------------------------------------- */
    const cellBoxes = document.querySelectorAll(".board-cell");
    cellBoxes.forEach(cell => {
        cell.addEventListener("click", () => {
            if (cell.innerText !== "") return;

            cell.innerText = player.getCurrentPlayer();

            mark.writeToArray(cell, boardGame, player.getCurrentPlayer())

            if (checkWinner.horizontalWinningCheck(boardGame.getBoard(), player.getCurrentPlayer()) ||
                checkWinner.verticalWinningCheck(boardGame.getBoard(), player.getCurrentPlayer()) ||
                checkWinner.diagonalWinningCheck(boardGame.getBoard(), player.getCurrentPlayer())) {

                cellBoxes.forEach(cell => {
                    cell.style.backgroundColor = "rgba(240, 248, 255, 0.8)";
                    cell.style.pointerEvents = "none";
                })

                return displayOutcome.setDisplay(player.getCurrentPlayer());
                
            }

            moveCount++;

            if (moveCount >= 9) {
                return "draw";
            }

            player.switchPlayer();


        })
    });

    const reset = document.getElementById("reset-game");

    reset.addEventListener("click", () => {
        console.log("Reset button clicked");
        boardGame = BoardFactory();
        boardGame.createBoardGame();
        console.log("new board game created");
        moveCount = 1;
        player = Player();
        cellBoxes.forEach(cell => {
            cell.style.backgroundColor = "rgb(240, 248, 255)";
            cell.style.pointerEvents = "auto";
        })



        cellBoxes.forEach(cell => {
            cell.innerText = "";
        })

        displayOutcome.resetDisplay();
    })



}

gameControl().startButtonAction();
// gameControl().resetButtonAction();
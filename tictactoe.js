/* Creating Board via Factory Function Method*/
function BoardFactory() {
    let array = [];
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
    let currentPlayer = "X";

    const switchPlayer = () => {
       currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X";
    }
    return {
        switchPlayer,
        getCurrentPlayer: () => currentPlayer
    }
}


/* Creating Game Logic */
function GameLogic() {

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
        const boardCell = document.querySelectorAll(".board-cell");
        for (let i = 0; i < 3; i++) {
            if (boardGame[i][1] === current &&
                boardGame[i][2] === current &&
                boardGame[i][3] === current) {
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
    const writeToBoard = (cell, boardGame, player) => {
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
        writeToBoard
    }
}

// The Game
function TicTacToe() {
    const player = Player();
    const mark = AcceptUserInput();
    const boardGame = BoardFactory();
    boardGame.createBoardGame();
    const gameLogic = GameLogic();
    let moveCount = 1;

    /* --------------------------------USER INTERACTION AND DATA DISPLAY------------------------------------------------- */
    const cellBoxes = document.querySelectorAll(".board-cell");
    cellBoxes.forEach(cell => {
        cell.addEventListener("click", () => {
            if (cell.innerText !== "") return;

            cell.innerText = player.getCurrentPlayer();

            mark.writeToBoard(cell, boardGame, player.getCurrentPlayer())

            if (gameLogic.horizontalWinningCheck(boardGame.getBoard(), player.getCurrentPlayer()) ||
                gameLogic.verticalWinningCheck(boardGame.getBoard(), player.getCurrentPlayer()) ||
                gameLogic.horizontalWinningCheck(boardGame.getBoard(), player.getCurrentPlayer())) {
                return console.log(`The winner is ${player.getCurrentPlayer()}`);
            }

            moveCount++;

            if(moveCount >= 9) {
                return "draw";
            }

            player.switchPlayer();
        })
    });
}

function gameControl() {
    const start = document.querySelector(".")
}
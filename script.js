// dom definitions
const chessboard = document.querySelector("#chessboard");
const boardSizeInput = document.querySelector("#board-size-input");
const generateBoardButton = document.querySelector("#generate-board");
const resetBoardButton = document.querySelector("#reset-board");

const currentBoardText = document.querySelector("#current-board");
const selectedSquareText = document.querySelector("#selected-square");

// application state
let boardSize = 8;
let selectedSquare = null;
let possibleMoves = [];

// generate board function
function generateBoard(){
    boardSize = Number(boardSizeInput.value);
    chessboard.innerHTML = "";
    chessboard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

    const totalSquares = boardSize * boardSize;

    for(let i = 0; i < totalSquares; i++){
        const square =document.createElement("div");

        const row = Math.floor(i / boardSize);
        const column = i % boardSize;

        // apply color to square box
        if((row + column) % 2 === 0){
            square.classList.add("square-light");
        }else{
            square.classList.add("square-dark");
        }

        square.classList.add("square");
        chessboard.append(square);
    }
}

// eventlisteners
generateBoardButton.addEventListener("click", generateBoard);
generateBoard();
// dom definitions
const chessboard = document.querySelector("#chessboard");

const boardSizeInput = document.querySelector("#board-size-input");
boardSizeInput.min = 4;
boardSizeInput.max = 16;

const generateBoardButton = document.querySelector("#generate-board");
const resetBoardButton = document.querySelector("#reset-board");

const currentBoardText = document.querySelector("#current-board");
const selectedSquareText = document.querySelector("#selected-square");

const possibleMovesText = document.querySelector("#possible-moves");

// application state
let boardSize = 8;
let selectedSquare = null;
let possibleMoves = [];

// generate board function
function generateBoard(){
    boardSize = Number(boardSizeInput.value);

    if (!Number.isInteger(boardSize) || boardSize < 4 || boardSize > 16) {
        alert("Enter a board size between 4 and 16.");
        return;
    }

    currentBoardText.textContent = `${boardSize} × ${boardSize}`;

    selectedSquare = null;
    possibleMoves = [];

    selectedSquareText.textContent = "-";
    possibleMovesText.textContent = "0";

    chessboard.innerHTML = "";
    chessboard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

    const totalSquares = boardSize * boardSize;

    for(let i = 0; i < totalSquares; i++){
        const square =document.createElement("div");

        const row = Math.floor(i / boardSize);
        const column = i % boardSize;

        square.dataset.row = row;
        square.dataset.column = column;

        // apply color to square box
        if((row + column) % 2 === 0){
            square.classList.add("square-light");
        }else{
            square.classList.add("square-dark");
        }

        // apply css to square
        square.classList.add("square");

        square.addEventListener("click", handleSquareClick);

        chessboard.append(square);
    }
}

// handle square click function
function handleSquareClick(event){
    selectedSquare = event.target;

    const row = Number(selectedSquare.dataset.row);
    const column = Number(selectedSquare.dataset.column);

    selectedSquareText.textContent = `(${row}, ${column})`;

    const previousSelectedSquare = document.querySelector(".selected-square");

    if(previousSelectedSquare){
        previousSelectedSquare.classList.remove("selected-square");
    }

    const highlightedSquares = document.querySelectorAll(".highlight-square");

    highlightedSquares.forEach((square) => {
        square.classList.remove("highlight-square");
    });

    selectedSquare.classList.add("selected-square");

    possibleMoves = [];

    // top-left
    let currentRow = row - 1;
    let currentColumn =column -1;
    while (currentRow >= 0 && currentColumn >= 0){
        const diagonalSquare = document.querySelector(
            `[data-row="${currentRow}"][data-column="${currentColumn}"]`
        );

        diagonalSquare.classList.add("highlight-square");
        possibleMoves.push(diagonalSquare);

        currentRow--;
        currentColumn--;
    }

    // top-right
    currentRow = row - 1;
    currentColumn = column + 1;
    while (currentRow >= 0 && currentColumn < boardSize) {
        const diagonalSquare = document.querySelector(
            `[data-row="${currentRow}"][data-column="${currentColumn}"]`
        );

        diagonalSquare.classList.add("highlight-square");
        possibleMoves.push(diagonalSquare);

        currentRow--;
        currentColumn++;
    }

    // bottom-left
    currentRow = row + 1;
    currentColumn = column - 1;
    while (currentRow < boardSize && currentColumn >= 0) {
        const diagonalSquare = document.querySelector(
            `[data-row="${currentRow}"][data-column="${currentColumn}"]`
        );

        diagonalSquare.classList.add("highlight-square");
        possibleMoves.push(diagonalSquare);

        currentRow++;
        currentColumn--;
    }

    // bottom-right
    currentRow = row + 1;
    currentColumn = column + 1;
    while (currentRow < boardSize && currentColumn < boardSize) {
        const diagonalSquare = document.querySelector(
            `[data-row="${currentRow}"][data-column="${currentColumn}"]`
        );

        diagonalSquare.classList.add("highlight-square");
        possibleMoves.push(diagonalSquare);

        currentRow++;
        currentColumn++;
    }
    possibleMovesText.textContent = possibleMoves.length;
}

// reset board function
function resetBoard() {
    document.querySelectorAll(".selected-square, .highlight-square")
        .forEach((square) => {
            square.classList.remove(
                "selected-square",
                "highlight-square"
            );
        });

    selectedSquare = null;
    possibleMoves = [];
    selectedSquareText.textContent = "-";
    possibleMovesText.textContent = "0";
}

// event listeners
generateBoardButton.addEventListener("click", generateBoard);

boardSizeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        generateBoard();
    }
});

resetBoardButton.addEventListener("click", resetBoard);

generateBoard();
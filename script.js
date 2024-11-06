const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const boardSize = 20;
const cellSize = canvas.width / boardSize;
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(''));
let currentPlayer = 'X';

drawGrid();

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);

    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        drawSymbol(ctx, row, col, currentPlayer);

        if (checkWin(row, col)) {
            setTimeout(() => showWinnerModal(currentPlayer), 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
});

function drawGrid() {
    ctx.strokeStyle = '#666'; // Sötétebb színű rács a jobb láthatóság érdekében
    for (let i = 0; i <= boardSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }
}

function drawSymbol(ctx, row, col, player) {
    const centerX = col * cellSize + cellSize / 2;
    const centerY = row * cellSize + cellSize / 2;
    ctx.lineWidth = 2;

    if (player === 'X') {
        ctx.strokeStyle = 'red'; // X színe
        ctx.beginPath();
        ctx.moveTo(centerX - 10, centerY - 10);
        ctx.lineTo(centerX + 10, centerY + 10);
        ctx.moveTo(centerX + 10, centerY - 10);
        ctx.lineTo(centerX - 10, centerY + 10);
        ctx.stroke();
    } else if (player === 'O') {
        ctx.strokeStyle = 'blue'; // O színe
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) || // Vízszintes
        checkDirection(row, col, 0, 1) || // Függőleges
        checkDirection(row, col, 1, 1) || // Átlós (bal felső -> jobb alsó)
        checkDirection(row, col, 1, -1)   // Átlós (jobb felső -> bal alsó)
    );
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    count += countInDirection(row, col, rowDir, colDir);
    count += countInDirection(row, col, -rowDir, -colDir);
    return count >= 5;
}

function countInDirection(row, col, rowDir, colDir) {
    let count = 0;
    let currentRow = row + rowDir;
    let currentCol = col + colDir;

    while (
        currentRow >= 0 && currentRow < boardSize &&
        currentCol >= 0 && currentCol < boardSize &&
        board[currentRow][currentCol] === currentPlayer
    ) {
        count++;
        currentRow += rowDir;
        currentCol += colDir;
    }
    return count;
}

function showWinnerModal(player) {
    const modal = document.getElementById('winnerModal');
    const winnerText = document.getElementById('winnerText');
    winnerText.textContent = `${player} nyert!`;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('winnerModal');
    modal.style.display = 'none';
    resetGame();
}

function resetGame() {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(''));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    currentPlayer = 'X';
}

document.addEventListener('DOMContentLoaded', function() {
    const board = document.createElement('div');
    board.className = 'board';
    document.getElementById('game').appendChild(board);

    const statusDiv = document.getElementById('status');
    const winnerText = document.getElementById('winner');
    const scoreX = document.getElementById('scoreX');
    const scoreO = document.getElementById('scoreO');
    let scores = { X: 0, O: 0 };
    let currentPlayer = '';
    let gridSize = 3; // Default grid size

    document.getElementById('startGame').addEventListener('click', function() {
        gridSize = parseInt(document.getElementById('gridSize').value);
        createBoard(gridSize);
        document.getElementById('gridSizeSelection').style.display = 'none';
        document.getElementById('choiceScreen').style.display = 'block';
    });

    document.getElementById('chooseX').addEventListener('click', function() {
        currentPlayer = 'X';
        document.getElementById('choiceScreen').style.display = 'none';
    });

    document.getElementById('chooseO').addEventListener('click', function() {
        currentPlayer = 'O';
        document.getElementById('choiceScreen').style.display = 'none';
    });

    function createBoard(size) {
        board.innerHTML = ''; // Clear existing board
        for (let i = 0; i < size; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            for (let j = 0; j < size; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.addEventListener('click', cellClick, false);
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    }

    function cellClick() {
        if (!currentPlayer) {
            alert('Please select to play as X or O.');
            return;
        }

        if (this.innerHTML === '' && statusDiv.classList.contains('hidden')) {
            this.innerHTML = currentPlayer;
            if (checkWinner()) {
                updateScore(currentPlayer);
                showWinner('Le joueur ' + currentPlayer + ' a gagné !');
            } else if (checkDraw()) {
                showWinner('Match nul !');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWinner() {
        const cells = [...document.querySelectorAll('.cell')];
        let win = false;
        const winConditions = generateWinConditions(gridSize);

        winConditions.some(condition => {
            if (cells[condition[0]].innerHTML && condition.every(index => cells[index].innerHTML === cells[condition[0]].innerHTML)) {
                win = true;
                return true;
            }
        });
        return win;
    }

    function generateWinConditions(size) {
        const conditions = [];
        // Horizontal & Vertical
        for (let i = 0; i < size; i++) {
            const horizontal = [], vertical = [];
            for (let j = 0; j < size; j++) {
                horizontal.push(i * size + j);
                vertical.push(j * size + i);
            }
            conditions.push(horizontal, vertical);
        }
        // Diagonals
        const diagonal1 = [], diagonal2 = [];
        for (let i = 0; i < size; i++) {
            diagonal1.push(i * size + i);
            diagonal2.push(i * size + (size - i - 1));
        }
        conditions.push(diagonal1, diagonal2);
        return conditions;
    }

    function checkDraw() {
        return [...document.querySelectorAll('.cell')].every(cell => cell.innerHTML !== '');
    }

    function updateScore(winner) {
        scores[winner]++;
        scoreX.innerText = scores.X;
        scoreO.innerText = scores.O;
    }

    function showWinner(message) {
        winnerText.innerText = message;
        statusDiv.classList.remove('hidden');
    }

    function resetGame() {
        // Clear the game board to start fresh
        board.innerHTML = ''; 
    
        // Reset game status and hide the status message
        statusDiv.classList.add('hidden');
        winnerText.innerText = '';
    
        // Show the initial setup screens without resetting scores
        initialSetup();
    }
    
    function initialSetup() {
        // Show grid size selection and reset currentPlayer
        document.getElementById('gridSizeSelection').style.display = 'block';
        document.getElementById('choiceScreen').style.display = 'none'; // Ensure choice screen is hidden until needed
        currentPlayer = ''; // Reset currentPlayer for a new game start
    }
    
    // Ensure this event listener is correctly attached to the "Rejouer" button
    document.getElementById('resetGame').addEventListener('click', resetGame);
    
    // Call initialSetup at the start to ensure the game is properly initialized
    initialSetup();
    
    
    
});

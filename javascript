
    // Initialisation
    const board = document.createElement('div');
    board.className = 'board';
    document.getElementById('game').appendChild(board);

    const statusDiv = document.getElementById('status');
    const winnerText = document.getElementById('winner');
    const scoreX = document.getElementById('scoreX');
    const scoreO = document.getElementById('scoreO');
    let scores = { X: 0, O: 0 };

    const playerX = 'X';
    const playerO = 'O';
    let currentPlayer = playerX;

    function createBoard() {
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.addEventListener('click', cellClick, false);
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    }

    function cellClick() {
        if (this.innerHTML == '' && statusDiv.classList.contains('hidden')) {
            this.innerHTML = currentPlayer;
            if (checkWinner()) {
                updateScore(currentPlayer);
                showWinner(currentPlayer);
            } else {
                currentPlayer = currentPlayer == playerX ? playerO : playerX;
            }
        }
    }

    function checkWinner() {
        const cells = document.querySelectorAll('.cell');
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of wins) {
            const [a, b, c] = combination;
            if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
                return true;
            }
        }
        return false;
    }

    function updateScore(winner) {
        scores[winner]++;
        scoreX.innerText = scores.X;
        scoreO.innerText = scores.O;
    }

    function showWinner(winner) {
        winnerText.innerText = 'Le joueur ' + winner + ' a gagné !';
        statusDiv.classList.remove('hidden');
    }

    function resetGame() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(function(cell) {
            cell.innerHTML = '';
        });
        currentPlayer = playerX;
        statusDiv.classList.add('hidden');
    }

    createBoard();

    document.getElementById('chooseX').addEventListener('click', function() {
        currentPlayer = playerX;
        document.getElementById('choiceScreen').style.display = 'none';
    });
    
    document.getElementById('chooseO').addEventListener('click', function() {
        currentPlayer = playerO;
        document.getElementById('choiceScreen').style.display = 'none';
    });
    
    function checkDraw() {
        const cells = document.querySelectorAll('.cell');
        let filled = true;
        cells.forEach(function(cell) {
            if (cell.innerHTML == '') filled = false;
        });
        return filled;
    }
    
    // Modifiez la fonction cellClick pour inclure la vérification du match nul
    function cellClick() {
        if (this.innerHTML == '' && statusDiv.classList.contains('hidden')) {
            this.innerHTML = currentPlayer;
            if (checkWinner()) {
                updateScore(currentPlayer);
                showWinner('Le joueur ' + currentPlayer + ' a gagné !');
            } else if (checkDraw()) {
                showWinner('Match nul !');
            } else {
                currentPlayer = currentPlayer == playerX ? playerO : playerX;
            }
        }
    }
    
    // Modifiez la fonction showWinner pour gérer l'affichage des matchs nuls
    function showWinner(message) {
        winnerText.innerText = message;
        statusDiv.classList.remove('hidden');
    }
    

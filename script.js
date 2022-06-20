    const cubes = Array.from(document.querySelectorAll('.cube'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const playerX_win = 'playerX_win';
    const playerO_win = 'playerO_win';
    const DREW = 'DREW';


    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i]; //[0,1,2]
            const a = board[winCondition[0]];// X || O
            const b = board[winCondition[1]];// X || O
            const c = board[winCondition[2]];// X || O
            if (a == "" || b == "" || c == "") {
                continue;
            }
            if (a == b && b == c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer == 'X' ? playerX_win : playerO_win);
            isGameActive = false;
            return;
        }

    if (!board.includes(""))
        announce(DREW);
    }

    const announce = (type) => {
        switch(type){
            case playerO_win:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case playerX_win:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case DREW:
                announcer.innerText = 'DREW';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText == 'X' || tile.innerText == 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`); //just color 
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    function resetBoard() {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide'); // 

        if (currentPlayer === 'O') {
            changePlayer();
        }

        cubes.forEach(tile => {
            tile.innerText = "";
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    cubes.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
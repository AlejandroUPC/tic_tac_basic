gameArray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]] //Game board matrix representation
playerPool = ['x', 'o'] //Possible player values 

let turnHeader = document.getElementById('playerTurn')
let allCells = document.querySelectorAll('.gameCell')


playerSymbol = playerPool[Math.round(Math.random())] //random player init


turnHeader.innerText = `It's the turn for ${playerSymbol}!`

for (let cell of allCells) {
    cell.addEventListener('click', function () {
        if (!cell.getAttribute('value')) {
            cell.setAttribute('value', playerSymbol);
            updateBoard(cell.getAttribute('pos'), playerSymbol)
            cell.innerText = playerSymbol;
            if (hasWon(playerSymbol)) {
                window.alert(`${playerSymbol} has won!`)
                history.go();
            };
            if (!movesLeft()) {
                window.alert('Game over!');
                history.go();
            }
        } else {
            window.alert('Invalid move! The cell is already taken!')
        }
        playerSymbol = switchTurn(playerSymbol);
        turnHeader.innerText = `It's the turn for ${playerSymbol}!`
        //gameArray.forEach(x => console.log(x)) 
        //print the gameboard after everyturn for debug purposes

    })
}



const switchTurn = (playerSymbol) => {
    /**
     * Function to switch user's turn.
     */
    if (playerSymbol === 'x') {
        return 'o'
    } else {
        return 'x'
    }
}

const updateBoard = (cellPosition, playerSymbol) => {
    /** 
     * Function that updates the gameboard after every movement.
     */
    gameArray[cellPosition[0]][cellPosition[1]] = playerSymbol
}

const hasWon = (playerSymbol) => {
    /**
     * Function to check if a player has won by checking the three conditions: horizontal, vertical and diagonal
     * @param {string} playerSymbol 
     */
    const checkHorizontals = (playerSymbol) => {
        for (let row of gameArray) {
            if (row.filter(x => x === playerSymbol).length === 3) {
                return true
            }
        }
    }

    const checkVerticals = (playerSymbol) => {
        for (let row in gameArray) {
            transposedArray = [gameArray[0][row], gameArray[1][row], gameArray[2][row]]
            if (transposedArray.filter(x => x === playerSymbol).length === 3) {
                return true
            }
        }
    }

    const checkDiagonals = (playerSymbol) => {
        diagonalArrays = [[gameArray[0][0], gameArray[1][1], gameArray[2][2]],
        [gameArray[0][2], gameArray[1][1], gameArray[2][0]]]
        for (let diagonalCondition of diagonalArrays) {
            if (diagonalCondition.filter(x => x === playerSymbol).length === 3) {
                return true
            }
        }
    }
    return (checkHorizontals(playerSymbol) || checkVerticals(playerSymbol) || checkDiagonals(playerSymbol))
}

const movesLeft = () => {
    /**
     * Function to check if there are any moves left.
     */
    rowsCter = 0
    for (let row of gameArray) {
        if (row.filter(x => x !== 0).length === 3) {
            rowsCter += 1;
        }
    }
    return rowsCter !== 3
}

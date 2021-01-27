import GameConstants from '../models/GameConstants';

const COL_SIZE = 3;
const ROW_SIZE = 3;
const FREE_CELL = "U";

export default class TTTController {
    _grid;
    _currentPlayer
    _numMoves

    constructor() {
        this._initGrid();
        this._currentPlayer = GameConstants.PLAYERX;
        this._numMoves = 0;
    }

    /**
     * Public API to set a move of the current player
     * If current Player won returns true
     * Otherwise will return false and switches state to next player
     * @param {x: number y: number} coordinate  
     * @returns Boolean
     */
    takeTurn(coordinate) {
        if (this.isCoordinateAvailable(coordinate)) {
            this._setCoordinates(coordinate);
            if (this._checkIfPlayerWon()) {
                return true;
            } else {
                this._switchCurrentPlayer();
                this._incrementNumMoves();
            }
        }

        return false;
    } 

    /**
     * Will return the current player
     * @returns String
     */
    getCurrentPlayer() {
        return this._currentPlayer;
    }

    /**
     * Returns the number of moves made by the players
     * @returns number
     */
    getNumberOfMoves() {
        return this._numMoves;
    }

    /**
     * Returns the current state of the game grid
     * @returns Array
     */
    getCurrentGrid() {
        return this._grid;
    }

    /**
     * Checks if passed in coordinate has already been taken
     * @param {x: number y: number} coordinate 
     */
    isCoordinateAvailable(coordinate) {
        return this._grid[coordinate.x] && this._grid[coordinate.x][coordinate.y] !== FREE_CELL ? false : true;
    }

    _initGrid() {
        this._grid = [];
        for (let i = 0; i < COL_SIZE; i++) {
            this._grid[i] = [];
            for (let j = 0; j < ROW_SIZE; j++) {
                this._grid[i][j] = FREE_CELL;
            }
        }
    }

    /**
     * When a player makes a move his coordinates are saved to the data set
     * @param {x: number y: number} coordinate  
     */
    _setCoordinates(coordinate) {
        this._grid[coordinate.x][coordinate.y] = this.getCurrentPlayer();
    }


    /**
     * Switches the current player to the next
     */
    _switchCurrentPlayer() {
        if (this.getCurrentPlayer() === GameConstants.PLAYERX) {
            this._setCurrentPlayer(GameConstants.PLAYERO);
        } else {
            this._setCurrentPlayer(GameConstants.PLAYERX);
        }
    }

    /**
     * Sets the current player
     * @param player 
     */
    _setCurrentPlayer(player) {
        this._currentPlayer = player;
    }

    /**
     * Increases the number of moves by 1
     */
    _incrementNumMoves() {
        this._numMoves++;
    }

    /**
     * Game logic to determine if current player has won the game
     * @returns Boolean
     */
    _checkIfPlayerWon() {
        let playerWon = false;

        //Check Rows
        for (let i = 0; i < this._grid.length; i++) {
            let count = 0;
            for (let j = 0; j < this._grid[i].length; j++) {
                if (this._grid[i][j] === this.getCurrentPlayer()) {
                    count++;    
                }
            }
            if (count === 3) {
                playerWon = true;
                break;
            }
        }

        //Check Columns
        if (!playerWon) {
            for (let i = 0; i < this._grid.length; i++) {
                let count = 0;
                for (let j = 0; j < this._grid[i].length; j++) {
                    if (this._grid[j][i] === this.getCurrentPlayer()) {
                        count++;    
                    }
                }
                if (count === 3) {
                    playerWon = true;
                    break;
                }
            }
        }

        //Check Diagonal 
        if (!playerWon) {
            let count = 0;
            if (this._grid[1][1] === this.getCurrentPlayer()) {
                count++;
            }
            if (this._grid[0][0] === this.getCurrentPlayer() || this._grid[0][2] === this.getCurrentPlayer()) {
                count++;
            }
            if (this._grid[2][0] === this.getCurrentPlayer() || this._grid[2][2] === this.getCurrentPlayer()) {
                count++;
            }
            if (count === 3) {
                playerWon = true;
            }
        }

        return playerWon;
    }

}
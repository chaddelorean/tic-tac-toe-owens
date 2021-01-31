import GameConstants from '../models/GameConstants';

const COL_SIZE = 3;
const ROW_SIZE = 3;
const MIN_NUM_MOVES = 5;
const NUM_TO_WIN = 3;

export default class TTTController {
    _grid;
    _currentPlayer
    _numMoves
    _wonCoord
    _hasWon
    _hasGuestJoined

    constructor() {
        this._initGrid();
        this._currentPlayer = GameConstants.PLAYERX;
        this._numMoves = 0;
        this._wonCoord = "";
        this._hasWon = false;
        this._hasGuestJoined = false;
    }

    /**
     * Public API to set a move of the current player
     * @param {x: number y: number} coordinate  
     */
    takeTurn(coordinate) {
        if (!this.hasPlayerWon() && this.isCoordinateAvailable(coordinate)) {
            this._setCoordinates(coordinate);
            this._incrementNumMoves();
            this._checkIfPlayerWon()
            if (!this.hasPlayerWon()) {
                this._switchCurrentPlayer();
            }
        }
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
        return this._grid[coordinate.x] && this._grid[coordinate.x][coordinate.y] !== GameConstants.FREE_CELL ? false : true;
    }

    /**
     * Returns the coordinates the player won with
     * @returns String
     */
    getWonCoordinates() {
        return this._wonCoord;
    }

    /**
     * Returns boolean if player has already won
     * @returns Boolean
     */
    hasPlayerWon() {
        return this._hasWon;
    }

    /**
     * Sets if guest has joined in multiplayer
     */
    setGuestAsJoined() {
        this._hasGuestJoined = true;
    }

    /**
     * Eports current state of game in JSON format
     * @returns object
     */
    toJSON() {
        return {
            grid: this._grid,
            currentPlayer: this._currentPlayer,
            numMoves : this._numMoves,
            wonCoord: this._wonCoord,
            hasWon: this._hasWon,
            hasGuestJoined: this._hasGuestJoined
        }
    }

    /**
     * Updates current game state from JSON object
     * @param {grid: Array, currentPlayer: string, numMoves: number, wonCoord: string, hasWon: Boolean} update 
     */
    updateFromJson(update) {
        this._grid = update.grid;
        this._currentPlayer = update.currentPlayer;
        this._numMoves = update.numMoves;
        this._wonCoord = update.wonCoord;
        this._hasWon = update.hasWon;
        this._hasGuestJoined = update.hasGuestJoined;
    }

    /**
     * Used to init grid with default values
     */
    _initGrid() {
        this._grid = [];
        for (let i = 0; i < COL_SIZE; i++) {
            this._grid[i] = [];
            for (let j = 0; j < ROW_SIZE; j++) {
                this._grid[i][j] = GameConstants.FREE_CELL;
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
        this._hasWon = this._numMoves >= MIN_NUM_MOVES && (this._checkRows() || this._checkColumns() || this._checkDiagonals());
        return this._hasWon;
    }

    /**
     * Checks if player won by rows
     */
    _checkRows() {
        let playerWon = false;
        for (let i = 0; i < this._grid.length; i++) {
            let count = 0;
            this._wonCoord = "";
            for (let j = 0; j < this._grid[i].length; j++) {
                if (this._grid[i][j] === this.getCurrentPlayer()) {
                    this._wonCoord = GameConstants.ROW + i;
                    count++;    
                }
            }
            if (count === NUM_TO_WIN) {
                playerWon = true;
                break;
            }
        }

        return playerWon;
    }

    /**
     * Checks if player won by columns
     */
    _checkColumns() {
        let playerWon = false;
        for (let i = 0; i < this._grid.length; i++) {
            let count = 0;
            this._wonCoord = "";
            for (let j = 0; j < this._grid[i].length; j++) {
                if (this._grid[j][i] === this.getCurrentPlayer()) {
                    this._wonCoord = GameConstants.COL + i;
                    count++;    
                }
            }
            if (count === NUM_TO_WIN) {
                playerWon = true;
                break;
            }
        }

        return playerWon;
    }

    /**
     * Checks if player won by diagonals
     */
    _checkDiagonals() {
        let playerWon = false;
        let count = 0;
        this._wonCoord = "";
        if (this._grid[1][1] === this.getCurrentPlayer()) {
            count++;
        }
        if (this._grid[0][0] === this.getCurrentPlayer() && this._grid[2][2] === this.getCurrentPlayer()) {
            this._wonCoord = GameConstants.LEFT_DIAGONAL;
            count += 2;
        }
        if (this._grid[0][2] === this.getCurrentPlayer() && this._grid[2][0] === this.getCurrentPlayer()) {
            this._wonCoord = GameConstants.RIGHT_DIAGONAL;
            count += 2;
        }
        if (count === NUM_TO_WIN) {
            playerWon = true;
        }

        return playerWon;
    }

}
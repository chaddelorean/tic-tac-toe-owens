<template>
    <div class="game-container">
        <div class="grid-container">       
            <tic-tac-cell class="row-border" coordinates="[0,0]" :value="slot1" @click.native="markMove"></tic-tac-cell>
            <div v-bind:class="{animateshow: row0}" class="win-line-row row-0"></div>
            <div v-bind:class="{animateshow: col0}" class="win-line-column col-0"></div>
            <div v-bind:class="{animateshow: leftDiagonal}" class="win-line-row left-diagonal"></div>
            <div v-bind:class="{animateshow: rightDiagonal}" class="win-line-row right-diagonal"></div>
            <tic-tac-cell class="row-border cell-border" coordinates="[0,1]" :value="slot2" @click.native="markMove"></tic-tac-cell>
            <tic-tac-cell class="row-border cell-border" coordinates="[0,2]" :value="slot3" @click.native="markMove"></tic-tac-cell>
            <tic-tac-cell class="row-border" coordinates="[1,0]" :value="slot4" @click.native="markMove"></tic-tac-cell>
            <div v-bind:class="{animateshow: row1}" class="win-line-row row-1"></div>
            <div v-bind:class="{animateshow: col1}" class="win-line-column col-1"></div>
            <tic-tac-cell class="row-border cell-border" coordinates="[1,1]" :value="slot5" @click.native="markMove"></tic-tac-cell>
            <tic-tac-cell class="row-border cell-border" coordinates="[1,2]" :value="slot6" @click.native="markMove"></tic-tac-cell>
            <tic-tac-cell coordinates="[2,0]" :value="slot7" @click.native="markMove"></tic-tac-cell>
            <div v-bind:class="{animateshow: row2}" class="win-line-row row-2"></div>
            <div v-bind:class="{animateshow: col2}" class="win-line-column col-2"></div>
            <tic-tac-cell class="cell-border" coordinates="[2,1]" :value="slot8" @click.native="markMove"></tic-tac-cell>
            <tic-tac-cell class="cell-border" coordinates="[2,2]" :value="slot9" @click.native="markMove"></tic-tac-cell>        
        </div>

        <div class="game-controls">
            <div v-bind:class="{animateshow: gameStatus}" class="game-status">{{gameStatus}}</div>
            <div class="game-buttons">
                <tttbutton text="New Game" @click.native="newGame"></tttbutton>
                <tttbutton text="Main Menu" @click.native="newGame"></tttbutton>
            </div>
        </div>
    </div>
</template>

<script>
import TicTacCell from './TicTacCell.vue'
import TTTController from '../../controllers/TTTController'
import GameConstants from '../../models/GameConstants'
import tttbutton from '../atoms/TTTButton';

export default {
    components: { 
        TicTacCell,
        tttbutton
    },
    name: 'TicTacToe',
    data () {
        return {
            tttController: new TTTController(),
            slot1: "",
            slot2: "",
            slot3: "",
            slot4: "",
            slot5: "",
            slot6: "",
            slot7: "",
            slot8: "",
            slot9: "",
            row0: false,
            row1: false,
            row2: false,
            col0: false,
            col1: false,
            col2: false,
            leftDiagonal: false,
            rightDiagonal: false,
            gameStatus: ""
        }
    },
    methods: {
        markMove: function(e) {
            if (!this.tttController.hasPlayerWon()) {
                const elementCoordinates = JSON.parse(e.currentTarget.getAttribute('coordinates'));
                let coordinates = {x: elementCoordinates[0], y: elementCoordinates[1]};
                if (this.tttController.isCoordinateAvailable(coordinates)) {
                    this.updateSlots(e.currentTarget.getAttribute('coordinates'));
                    const currentPlayer = this.tttController.getCurrentPlayer();
                    const turnResult = this.tttController.takeTurn(coordinates);
                    if (turnResult) {
                        this.calculateWin();
                        this.gameStatus = "Player " + currentPlayer + " Wins";
                    } else if (this.tttController.getNumberOfMoves() >= 9) {
                        this.gameStatus = "Tie Game";
                    }
                }
            }
        },
        updateSlots: function(coordinates) {
            switch (coordinates) {
                case "[0,0]":
                    this.slot1 = this.tttController.getCurrentPlayer();
                    break;
                case "[0,1]":
                    this.slot2 = this.tttController.getCurrentPlayer();
                    break;
                case "[0,2]":
                    this.slot3 = this.tttController.getCurrentPlayer();
                    break;
                case "[1,0]":
                    this.slot4 = this.tttController.getCurrentPlayer();
                    break;
                case "[1,1]":
                    this.slot5 = this.tttController.getCurrentPlayer();
                    break;
                case "[1,2]":
                    this.slot6 = this.tttController.getCurrentPlayer();
                    break;
                case "[2,0]":
                    this.slot7 = this.tttController.getCurrentPlayer();
                    break;
                case "[2,1]":
                    this.slot8 = this.tttController.getCurrentPlayer();
                    break;
                case "[2,2]":
                    this.slot9 = this.tttController.getCurrentPlayer();
                    break;
            }
        },
        calculateWin: function() {
            switch (this.tttController.getWonCoordinates()) {
                case GameConstants.ROW + "0":
                    this.row0 = true;
                    break;
                case GameConstants.ROW + "1":
                    this.row1 = true;
                    break;
                case GameConstants.ROW + "2":
                    this.row2 = true;
                    break;
                case GameConstants.COL + "0":
                    this.col0 = true;
                    break;
                case GameConstants.COL + "1":
                    this.col1 = true;
                    break;
                case GameConstants.COL + "2":
                    this.col2 = true;
                    break;
                case GameConstants.LEFT_DIAGONAL:
                    this.leftDiagonal = true;
                    break;
                case GameConstants.RIGHT_DIAGONAL:
                    this.rightDiagonal = true;
                    break;
            }
        },
        newGame: function() {
            this.tttController = new TTTController();
            this.slot1 = "";
            this.slot2 = "";
            this.slot3 = "";
            this.slot4 = "";
            this.slot5 = "";
            this.slot6 = "";
            this.slot7 = "";
            this.slot8 = "";
            this.slot9 = "";
            this.row0 = false;
            this.row1 = false;
            this.row2 = false;
            this.col0 = false;
            this.col1 = false;
            this.col2 = false;
            this.leftDiagonal = false;
            this.rightDiagonal = false;
            this.gameStatus = "";
        }
    },
    created: function() {
         this.tttController = new TTTController();
    }
}
</script>

<style scoped>
    .game-container {
        width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .grid-container {
        position: relative;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        height: 800px;
        width: 800px;
    }

    .grid-container .row-border {
        position: relative;
        border-bottom: 20px solid white;
    }

    .grid-container .cell-border {
        position: relative;
        border-left: 20px solid white;
    }

    .win-line-row {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        height: 10px;
        width: 100%;
        background-color: white;
        border-radius: 50px;
    }

    .win-line-column {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        height: 100%;
        width: 10px;
        background-color: white;
        border-radius: 50px;
    }

    .grid-container .row-0 {
        top: 16%;        
    }

    .grid-container .col-0 {
        left: 16%;
    }

    .grid-container .row-1 {
        top: 50%;        
    }

    .grid-container .col-1 {
        left: 50.6%;
    }

    .grid-container .row-2 {
        top: 83%;        
    }

    .grid-container .col-2 {
        left: 84%;
    }

    .grid-container .left-diagonal {
        top: 50%;
        left: -121PX;
        width: 129%;
        -webkit-transform: translateY(0px) translateX(0px) rotate(45deg);
    }

    .grid-container .right-diagonal {
        top: 52%;
        right: -121PX;
        width: 129%;
        -webkit-transform: translateY(0px) translateX(0px) rotate(134deg);
    }

    .game-controls {
        width: 100%;
        margin-top: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .game-controls .game-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 20%;
    }

    .game-controls .game-status {
        font-size: 50px;
        margin-bottom: 20px;
        min-height: 69px;
    }

    .animateshow {
        opacity: 1;
        visibility: visible;
        -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 1s; /* Firefox < 16 */
        -ms-animation: fadein 1s; /* Internet Explorer */
        -o-animation: fadein 1s; /* Opera < 12.1 */
        animation: fadein 1s;
    }

    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Firefox < 16 */
    @-moz-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Internet Explorer */
    @-ms-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    @media only screen and (max-width: 768px) {
        .cellContainer div {
            font-size: 75px;
        }
    }

    @media only screen and (max-width: 768px) {
        .grid-container {
            width: 100%;
            height: 400px;
        }
        
        .grid-container .row-border {
            border-bottom: 10px solid white;
        }
        .grid-container .cell-border {
            border-left: 10px solid white;
        }

        .win-line-row {
            height: 7px;
        }

        .win-line-column {
            width: 7px;
        }

        .grid-container .left-diagonal {
            left: -50PX;
            width: 127%;
            -webkit-transform: translateY(0px) translateX(0px) rotate(47deg);
        }

        .grid-container .right-diagonal {
            right: -62PX;
            width: 127%;
            -webkit-transform: translateY(0px) translateX(0px) rotate(132deg);
        }

        .game-controls {
            margin-top: 40px;
        }

        .game-controls .game-buttons {
            width: 100%;
        }
    }
</style>
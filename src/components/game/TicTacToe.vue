<template>
    <div class="grid-container">       
        <tic-tac-cell class="row-border" coordinates="[0,0]" :value="slot1" @click.native="markMove"></tic-tac-cell>
        <div v-show="row0" class="win-line-row row-0"></div>
        <div v-show="col0" class="win-line-column col-0"></div>
        <div v-show="leftDiagonal" class="win-line-row left-diagonal"></div>
        <div v-show="rightDiagonal" class="win-line-row right-diagonal"></div>
        <tic-tac-cell class="row-border cell-border" coordinates="[0,1]" :value="slot2" @click.native="markMove"></tic-tac-cell>
        <tic-tac-cell class="row-border cell-border" coordinates="[0,2]" :value="slot3" @click.native="markMove"></tic-tac-cell>
        <tic-tac-cell class="row-border" coordinates="[1,0]" :value="slot4" @click.native="markMove"></tic-tac-cell>
        <div v-show="row1" class="win-line-row row-1"></div>
        <div v-show="col1" class="win-line-column col-1"></div>
        <tic-tac-cell class="row-border cell-border" coordinates="[1,1]" :value="slot5" @click.native="markMove"></tic-tac-cell>
        <tic-tac-cell class="row-border cell-border" coordinates="[1,2]" :value="slot6" @click.native="markMove"></tic-tac-cell>
        <tic-tac-cell coordinates="[2,0]" :value="slot7" @click.native="markMove"></tic-tac-cell>
        <div v-show="row2" class="win-line-row row-2"></div>
        <div v-show="col2" class="win-line-column col-2"></div>
        <tic-tac-cell class="cell-border" coordinates="[2,1]" :value="slot8" @click.native="markMove"></tic-tac-cell>
        <tic-tac-cell class="cell-border" coordinates="[2,2]" :value="slot9" @click.native="markMove"></tic-tac-cell>        
    </div>
</template>

<script>
import TicTacCell from './TicTacCell.vue'
import TTTController from '../../controllers/TTTController'
import GameConstants from '../../models/GameConstants'
export default {
    components: { TicTacCell },
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
            rightDiagonal: false
        }
    },
    methods: {
        markMove: function(e) {
            if (!this.tttController.hasPlayerWon()) {
                const elementCoordinates = JSON.parse(e.currentTarget.getAttribute('coordinates'));
                let coordinates = {x: elementCoordinates[0], y: elementCoordinates[1]};
                if (this.tttController.isCoordinateAvailable(coordinates)) {
                    this.updateSlots(e.currentTarget.getAttribute('coordinates'));
                    const turnResult = this.tttController.takeTurn(coordinates);
                    if (turnResult) {
                        this.calculateWin();
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
        }
    },
    created: function() {
         this.tttController = new TTTController();
    }
}
</script>

<style scoped>
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
        position: absolute;
        height: 10px;
        width: 100%;
        background-color: white;
    }

    .win-line-column {
        position: absolute;
        height: 100%;
        width: 10px;
        background-color: white;
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
        left: 50%;
    }

    .grid-container .row-2 {
        top: 83%;        
    }

    .grid-container .col-2 {
        left: 83%;
    }

    .grid-container .left-diagonal {
        top: 50%;
        left: -121PX;
        width: 129%;
        -webkit-transform: translateY(0px) translateX(0px) rotate(45deg);
    }

    .grid-container .right-diagonal {
        top: 50%;
        right: -121PX;
        width: 129%;
        -webkit-transform: translateY(0px) translateX(0px) rotate(135deg);
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
            left: -47PX;
            width: 127%;
            -webkit-transform: translateY(0px) translateX(0px) rotate(47deg);
        }

        .grid-container .right-diagonal {
            right: -36PX;
            width: 127%;
            -webkit-transform: translateY(0px) translateX(0px) rotate(134deg);
        }
    }
</style>
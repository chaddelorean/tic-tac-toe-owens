<template>
    <div class="grid-container">        
        <tic-tac-cell class="row-border" coordinates="[0,0]" :value="slot1" @click.native="markMove"></tic-tac-cell>
        <tic-tac-cell class="row-border cell-border" coordinates="[0,1]" :value="slot2" @click.native="markMove"></tic-tac-cell>
        <tic-tac-cell class="row-border cell-border" coordinates="[0,2]" :value="slot3" @click.native="markMove"></tic-tac-cell>
        <tic-tac-cell class="row-border" coordinates="[1,0]" :value="slot4" @click.native="markMove"></tic-tac-cell>
        <tic-tac-cell class="row-border cell-border" coordinates="[1,1]" :value="slot5" @click.native="markMove"></tic-tac-cell>
        <tic-tac-cell class="row-border cell-border" coordinates="[1,2]" :value="slot6" @click.native="markMove"></tic-tac-cell>
        <tic-tac-cell coordinates="[2,0]" :value="slot7" @click.native="markMove"></tic-tac-cell>
        <tic-tac-cell class="cell-border" coordinates="[2,1]" :value="slot8" @click.native="markMove"></tic-tac-cell>
        <tic-tac-cell class="cell-border" coordinates="[2,2]" :value="slot9" @click.native="markMove"></tic-tac-cell>        
    </div>
</template>

<script>
import TicTacCell from './TicTacCell.vue'
import TTTController from '../controllers/TTTController'
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
            slot9: ""
        }
    },
    methods: {
        markMove: function(e) {
            const elementCoordinates = JSON.parse(e.currentTarget.getAttribute('coordinates'));
            let coordinates = {x: elementCoordinates[0], y: elementCoordinates[1]};
            if (this.tttController.isCoordinateAvailable(coordinates)) {
                this.updateSlots(e.currentTarget.getAttribute('coordinates'));
                const turnResult = this.tttController.takeTurn(coordinates);
                if (turnResult) {
                    alert("You Won!");
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
        }
    },
    created: function() {
         this.tttController = new TTTController();
    }
}
</script>

<style scoped>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        height: 500px;
        width: 500px;
    }
    .row-border {
        position: relative;
        border-bottom: 5px solid black;
    }
    .cell-border {
        position: relative;
        border-left: 5px solid black;
    }
</style>
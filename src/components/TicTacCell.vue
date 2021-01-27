<template>
    <div class="cellContainer">
        <span v-if="x">X</span>
        <span v-if="o">O</span>
    </div>
</template>

<script>
import GameConstants from '../models/GameConstants';
export default {
    name: 'TicTacCell',
    props: {
        value: String,
        coordinate: {
            type: String,
            value: ""
        }
    },
    data() {
        return {
            x: false,
            o: false
        }
    },
    methods: {
        setType: function() {
            if (this.value) {
                if (this.value === GameConstants.PLAYERX) {
                    this.x = true;
                    this.o = false;
                } else if (this.value === GameConstants.PLAYERO) {
                    this.o = true;
                    this.x = false;
                }
            }
        }
    },
    watch: {
        value: function() {
            this.setType();
        }
    },
    created: function() {
        this.setType();
    }

}
</script>

<style scoped>
    .cellContainer {
        display: flex;
        justify-content: center;
        align-content: center;
        height: 100%;
        width: 100%;
        content: ' ';
    }

    .cellContainer span {
        display: flex;
        align-items: center;
        font-size: 50px;
    }
</style>
<template>
    <div class="cellContainer">
        <div v-bind:class="{ show: x }">X</div>
        <div v-bind:class="{ show: o }">O</div>
    </div>
</template>

<script>
import GameConstants from '../../models/GameConstants';
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
        position: relative;
        display: flex;
        justify-content: center;
        align-content: center;
        height: 100%;
        width: 100%;
        content: ' ';
        color: white;
    }

    .cellContainer div {
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        font-size: 150px;
        margin-right: 25px;
        opacity: 0;
        visibility: hidden;
    }

    .cellContainer .show {
        opacity: 1;
        visibility: visible;
    }

    @media only screen and (max-width: 768px) {
        .cellContainer div {
            font-size: 75px;
        }
    }
</style>
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
                } else {
                    this.o = false;
                    this.x = false;
                }
            } else {
                this.o = false;
                this.x = false;
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
        opacity: 0;
        visibility: hidden;
    }

    .cellContainer .show {
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
</style>
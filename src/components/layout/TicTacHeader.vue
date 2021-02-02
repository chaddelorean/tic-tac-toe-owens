<template>
    <div id='header-container'>
        <span>{{headerText}}</span>
    </div>
</template>

<script>
export default {
    name: 'tictacheader',
    props: {
        headerText: {
            type: String,
            value: 'Tic Tac Toe'
        }
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped>
    #header-container {
        position: relative;
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #38a3a5;
        border-bottom: 15px solid white;
    }

    #header-container span {
        font-size: 75px;
    }

    #bottom-bar {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 15px;
        background-color: white;
    }

    @media only screen and (max-width: 768px) {
        #header-container {
            height: 50px;
            border-bottom: 5px solid white;
        }
        
        #header-container span {
            font-size: 30px;
        }
    }
</style>
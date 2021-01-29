<template>
    <div id='header-container'>
        <span>{{headerText}}</span>
        <div id='bottom-bar'></div>
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
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #80ed99;
        margin-bottom: 175px;
    }

    #header-container span {
        font-size: 100px;
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
            margin-bottom: 50px;
        }
        
        #header-container span {
            font-size: 50px;
        }
    }
</style>
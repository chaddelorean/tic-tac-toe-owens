<template>
    <div class='button-container'>
        <span>{{this.text}}</span>
    </div>
</template>

<script>
export default {
    name: 'tttbutton',
    props: {
        text: {
            type: String,
            value: ""
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
    .button-container {
        width: 100%;
        min-height: 50px;
        background-color: transparent;
        border: solid 5px white;
        font-weight: bold;
        padding-top: 3px;
        padding-bottom: 3px;
        font-size: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    @media only screen and (max-width: 768px) { 
        .button-container {
            margin-bottom: 10px;
            font-size: 35px;
        }
    }
</style>
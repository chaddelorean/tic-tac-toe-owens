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
        width: 100px;
        height: 50px;
        background-color: transparent;
        border: solid 5px white;
        padding: 8px;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
</style>
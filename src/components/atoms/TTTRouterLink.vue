<template>
    <div class="ttt-router-link">
        <router-link :to="to">{{text}}</router-link>
    </div>
</template>

<script>
export default {
    name: "tttrouterlink",
    props: {
        to: {
            type: String,
            value: "/"
        },
        text: {
            tpe: String,
            value: "Change Me!"
        }
    }
}
</script>

<style scoped>
    .ttt-router-link {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 125px;
        margin-left: 10px;
    }

    .ttt-router-link a {
        text-decoration: none;
        border-color: transparent;
        font-size: 20px;
        color: white;
        font-weight: bold;
        padding: 8px;
        border: 5px solid white;
        height: 50px;
        display: block;
    }
</style>
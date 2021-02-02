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
        width: 100%;
        min-height: 50px;
        padding-top: 8px;
        padding-bottom: 8px;
        border: 5px solid white;
    }

    .ttt-router-link a {
        text-decoration: none;
        border-color: transparent;
        font-size: 40px;
        font-weight: bold;
        color: white;
        display: block;
        width: 100%
    }
</style>
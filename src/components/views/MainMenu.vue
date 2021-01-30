<template>
    <div class="main-menu-container">
        <div class="router-container">
            <img src="../../assets/localgame.png"/>
            <tttrouterlink to="localgame" text="Local Game"></tttrouterlink>
        </div>
        <div class="router-container">
            <img src="../../assets/remotegame.png"/>
            <tttrouterlink to="remotegame" text="Remote Game"></tttrouterlink>
        </div>
    </div>
</template>

<script>
import tttrouterlink from '../atoms/TTTRouterLink'
export default {
    name: "MainMenu",
    components: {
        tttrouterlink
    },
    props: {

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
    .main-menu-container {
        width: 60%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        min-height: 800px;
    }
    .main-menu-container .router-container {
        display: flex;
        flex-direction: column;
        height: 75px;
        justify-content: space-evenly;
    }
    .router-container img {
        height: 150px;
        margin-bottom: 30px;
    }

    @media only screen and (max-width: 768px) {
        .main-menu-container {
            flex-direction: column;
            justify-content: space-around;
            min-height: 550px;
        }
    }
</style>
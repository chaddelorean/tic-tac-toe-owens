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
import GameConstants from '../../models/GameConstants'
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

    },
    created: function() {
        localStorage.removeItem(GameConstants.LOCAL_STORAGE_KEY);
    }
}
</script>

<style scoped>
    .main-menu-container {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        min-height: 250px;
        padding-top: 50px;
        padding-bottom: 50px;
        background-color: #57cc99;
    }
    .main-menu-container .router-container {
        display: flex;
        flex-direction: column;
        height: 75px;
        justify-content: space-evenly;
    }
    .router-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .router-container img {
        height: auto;
        width: 150px;
        margin-bottom: 30px;
    }

    @media only screen and (max-width: 768px) {
        .main-menu-container {
            flex-direction: column;
            justify-content: space-around;
            min-height: 450px;
            width: 100%;
        }
        .router-container {
            width: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .router-container img {
            height: auto;
            width: 100px;
        }
    }
</style>
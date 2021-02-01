<template>
    <div id="footer-container">
        <div class="footer-content">{{footerText}}</div>
    </div>
</template>

<script>
export default {
    name: 'tictacfooter',
    props: {
        footerText: {
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
    #footer-container {
        width: 100%;
        height: 200px;
        margin-top: 50px;
        border-top: solid 20px white;
        background-color: #57cc99;
    }
    #footer-container .footer-content {
        margin: 50px;
        font-size: 30px;
    }

     @media only screen and (max-width: 768px) {
         #footer-container {
             border-top: solid 5px white;
         }

         #footer-container .footer-content {
             margin: 10px;
             font-size: 20px;
         }
     }
</style>
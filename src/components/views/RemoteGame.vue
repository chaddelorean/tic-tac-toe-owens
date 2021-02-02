<template>
    <div class="remote-game-container">
        <div v-show="!hasGuestJoined" class="setup-remote-game">
            <img class="remote-image" src="../../assets/remotegame.png"/>
            <div class="waiting-for-guest-text">
                <img class="spinner" src="../../assets/spinner.png" />
                <span>Waiting for guest to join . . .</span>
            </div>
            <p>Send the link below to your guest to start the game</p>
            <div class="guest-url-container">
                <div class="guest-url">{{guestURL}}</div>
                <tttbutton text="Copy" @click.native="copyURL"></tttbutton>
            </div>
        </div>
        <div class="game-container-with-guest" v-bind:class="{animateshow: hasGuestJoined}">
            <tic-tac-toe :multiplayer="player" :sessionid="sessionid"></tic-tac-toe>
        </div>
    </div>
</template>

<script>
import TicTacToe from '../molecules/TicTacToe'
import GameConstants from '../../models/GameConstants'
import MultiPlayer from '../../controllers/MultiPlayer';
import TTTController from '../../controllers/TTTController'
import tttbutton from '../atoms/TTTButton'

export default {
    name: "RemoteGame",
    components: {
        TicTacToe,
        tttbutton
    },
    props: {

    },
    data() {
        return {
            player: "",
            sessionid: -1,
            hasGuestJoined: false,
            guestURL: ""
        }
    },
    methods: {
        createSessionID: async function() {
            let lastSessionID = await MultiPlayer.getLatestSessionID();
            if (lastSessionID) {
                lastSessionID++;
            } else {
                lastSessionID = 1;
            }
            return lastSessionID;
        },
        copyURL: function() {
             var dummy = document.createElement("textarea");
            document.body.appendChild(dummy);
            dummy.value = this.guestURL;
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
            this.$toast.success("Copied!");
        },
        setupHostSession: function() {
            this.createSessionID().then(sessionID => {
                this.guestURL = document.URL + "?sessionID=" + sessionID;
                MultiPlayer.pushGameState(sessionID, new TTTController().toJSON());
                this.guestListener = MultiPlayer.registerGameUpdate(sessionID, (snapshot) => {
                    if (snapshot && snapshot.val()) {
                        this.hasGuestJoined = snapshot.val().hasGuestJoined;
                        this.sessionid = parseInt(sessionID);
                    }
                });
            });
        }
    },
    watch: {
        hasGuestJoined: function() {
            if (this.hasGuestJoined && this.guestListener) {
                MultiPlayer.detachListener(this.guestListener);
            } 
        }
    },
    created: function() {
        MultiPlayer.initFirebaseSession();
        let sessionID = this.$route.query.sessionID;
        if (sessionID) {
            this.sessionid = parseInt(sessionID);
            this.player = GameConstants.PLAYERO;
            this.hasGuestJoined = true;
        } else {
            this.player = GameConstants.PLAYERX;
            this.setupHostSession();
        }
    }
}
</script>

<style scoped>
    .remote-game-container {
        display: flex;
        justify-content: center;
        width: 100%;
        padding-top: 50px;
        padding-bottom: 50px;
        background-color: #57cc99;
    }
    .setup-remote-game {
        width: 50%;
        font-size: 25px;
        font-weight: bold;
    }

    .setup-remote-game .guest-url-container {
        display: flex;
        justify-content: space-evenly;
    }

    .setup-remote-game .guest-url {
        border: 5px solid white;
        padding-top: 8px;
        padding-bottom: 8px;
        margin-right: 10px;
        width: 2000px;
    }

    .setup-remote-game .waiting-for-guest-text {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
        margin-bottom: 50px;
        font-size: 50px;
    }

    .setup-remote-game .remote-image {
        height: auto;
        width: 150px;
    }

   .setup-remote-game .waiting-for-guest-text .spinner {
        height: auto;
        width: 50px;
        margin-right: 15px;
        animation: spinner 1s linear infinite;
   }

   .remote-game-container .game-container-with-guest {
        width: 100%;
        opacity: 0;
        visibility: hidden;
        display: none;
   }

   .remote-game-container .animateshow {
        opacity: 1;
        visibility: visible;
        display: block;
        -webkit-animation: fadein 3s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 3s; /* Firefox < 16 */
        -ms-animation: fadein 3s; /* Internet Explorer */
        -o-animation: fadein 3s; /* Opera < 12.1 */
        animation: fadein 3s;
    }

    .toast-position {
        bottom: 30%!important;
    }

    @keyframes spinner {
        to {transform: rotate(360deg);}
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
        .remote-game-container {
            width: 100%;
            padding-top: 0;
            padding-bottom: 0;
        }
        
        .setup-remote-game {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 95%;
            padding-top: 20px;
            padding-bottom: 10px;
        }

        .setup-remote-game .remote-image {
            width: 100px;
        }

        .setup-remote-game p { 
            width: 80%;
        }

        .setup-remote-game .guest-url-container {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 95%;
        }

        .setup-remote-game .guest-url {
            word-wrap: break-word;
            width: 100%;
            margin-bottom: 20px;
            margin-right: 0;
        }

        .setup-remote-game .waiting-for-guest-text .spinner {
            margin-right: 0;
        }

        .setup-remote-game .waiting-for-guest-text {
            flex-direction: column;
            font-size: 25px;
            width: 95%;
            margin-bottom: 10px;
        }
    }
</style>
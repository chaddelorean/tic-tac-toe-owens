<template>
    <div class="remote-game-container">
        <div v-show="!hasGuestJoined" class="setup-remote-game">
            <img src="../../assets/remotegame.png"/>
            <div class="waiting-for-guest-text">
                <img src="../../assets/spinner.png" />
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
    .setup-remote-game {
        font-size: 25px;
        font-weight: bold;
    }

    .setup-remote-game .guest-url-container {
        display: flex;
        justify-content: space-evenly;
    }

    .setup-remote-game .guest-url {
        border: 5px solid white;
        padding: 8px;
        margin-right: 10px;
    }

    .setup-remote-game .waiting-for-guest-text {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
        margin-bottom: 50px;
        font-size: 50px;
    }

   .setup-remote-game .waiting-for-guest-text img {
        height: 50px;
        margin-right: 15px;
        animation: spinner 1s linear infinite;
   }

   .remote-game-container .game-container-with-guest {
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
        .setup-remote-game {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .setup-remote-game img {
            height: 200px;
        }

        .setup-remote-game p { 
            width: 80%;
        }

        .setup-remote-game .guest-url-container {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .setup-remote-game .guest-url {
            word-wrap: break-word;
            width: 65%;
            margin-bottom: 20px;
        }

        .setup-remote-game .waiting-for-guest-text {
            flex-direction: column;
            font-size: 25px;
            width: 95%;
            margin-bottom: 10px;
        }
    }
</style>
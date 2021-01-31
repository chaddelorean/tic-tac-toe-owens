<template>
    <div class="remote-game-container">
        <div v-show="!hasGuestJoined" class="setup-remote-game">
            <img src="../../assets/remotegame.png"/>
            <p>Send the link below to your guest to start the game</p>
            <div class="guest-url-container">
                <div class="guest-url">{{guestURL}}</div>
                <tttbutton text="Copy" @click.native="copyURL"></tttbutton>
            </div>
        </div>
        <div v-show="hasGuestJoined" class="game-container">
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
    }
</style>
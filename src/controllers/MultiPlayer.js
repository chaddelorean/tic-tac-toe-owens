import firebase from "firebase/app";
import "firebase/database";

const BASE = "game-sessions/"
export default class MultiPlayer {
    /**
     * Will init firebase session based on config
     */
    static initFirebaseSession() {
        if (firebase.apps.length === 0) {
            const firebaseConfig = {
                apiKey: "AIzaSyBXD35ShAvf1SrwVSKGrgsl-Odibwrq1G0",
                authDomain: "tic-tac-toe-owens.firebaseapp.com",
                projectId: "tic-tac-toe-owens",
                storageBucket: "tic-tac-toe-owens.appspot.com",
                messagingSenderId: "89134231715",
                appId: "1:89134231715:web:50b6e7d9333dd1542d8f16",
                databaseURL: "https://tic-tac-toe-owens-default-rtdb.firebaseio.com/"
              };
    
            firebase.initializeApp(firebaseConfig);
        }
    }

    /**
     * Will update firebase based with current game state from player
     * @param string sessionID 
     * @param object gameState 
     */
    static pushGameState(sessionID, gameState) {
        const database = firebase.database();
        database.ref(BASE + sessionID).set(gameState);
    }

    /**
     * Sets up a callback function for when the websocket receives an update
     * @param string sessionID 
     * @param function cb 
     */
    static registerGameUpdate(sessionID, cb) {
        const starCountRef = firebase.database().ref(BASE + sessionID);
        return starCountRef.on('value', (snapshot) => {
            if (typeof cb === "function") {
                cb(snapshot);
            }
        });
    }

    /**
     * Will query firebase and calculate the latest sessionID
     * @return number
     */
    static async getLatestSessionID() {
        const gameSessions = await (await firebase.database().ref(BASE).once('value')).val();
        if (!gameSessions) {
            return 0;
        }
        return Object.keys(gameSessions).sort().reverse()[0];
    }

    /**
     * Will return current state of game from firebase
     * @param string sessionID 
     */
    static async getCurrentGameState(sessionID) {
        return await (await firebase.database().ref(BASE + sessionID).once('value')).val();
    }

    /**
     * Used to detach listener from firebase websocket update
     * @param function cb 
     */
    static detachListener(cb) {
        firebase.database().ref(BASE).off("value", cb);
    }
}
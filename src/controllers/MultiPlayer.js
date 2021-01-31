import firebase from "firebase/app";
import "firebase/database";

const BASE = "game-sessions/"
export default class MultiPlayer {
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

    static pushGameState(sessionID, gameState) {
        const database = firebase.database();
        database.ref(BASE + sessionID).set(gameState);
    }

    static registerGameUpdate(sessionID, cb) {
        const starCountRef = firebase.database().ref(BASE + sessionID);
        return starCountRef.on('value', (snapshot) => {
            if (typeof cb === "function") {
                cb(snapshot);
            }
        });
    }

    static async getLatestSessionID() {
        const gameSessions = await (await firebase.database().ref(BASE).once('value')).val();
        return Object.keys(gameSessions).sort().reverse()[0];
    }

    static detachListener(cb) {
        firebase.database().ref(BASE).off("value", cb);
    }
}
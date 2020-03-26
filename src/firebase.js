import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

const config = {
  apiKey: "AIzaSyAmCMShIqVOJ6ddAfLMTUcwhW2Oc1Wf48c",
  authDomain: "newalbumapp.firebaseapp.com",
  databaseURL: "https://newalbumapp.firebaseio.com",
  projectId: "newalbumapp",
  storageBucket: "newalbumapp.appspot.com",
  messagingSenderId: "170368037749",
  appId: "1:170368037749:web:5eda1e5673c8af569d593c"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const storage = firebase.storage(); 

export function snapshotToArray(snapshot) {
  const updated_array = [];
        snapshot.forEach(s => {
          const data = s.data()
          data.id = s.id
          updated_array.push(data)
        })
    return updated_array
}

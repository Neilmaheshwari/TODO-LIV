const firebaseConfig = {
  apiKey: "AIzaSyAawoVRkJQZjaOBfgcS2EOyaLQzVFzZBSI",
  authDomain: "to-do-liv.firebaseapp.com",
  projectId: "to-do-liv",
  storageBucket: "to-do-liv.appspot.com",
  messagingSenderId: "1096961858211",
  appId: "1:1096961858211:web:3aa371fd043b7888aefd16",
  measurementId: "G-PZ6ZT9KVNG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
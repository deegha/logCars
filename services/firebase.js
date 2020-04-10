import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'

// const config = {
//   apiKey: "AIzaSyA6RcRrLs1H6ABQhib_q7uoaT2EU9emC_Q",
//   authDomain: "mellow-music.firebaseapp.com",
//   databaseURL: "https://mellow-music.firebaseio.com",
//   projectId: "mellow-music",
//   storageBucket: "mellow-music.appspot.com",
//   messagingSenderId: "771182712180",
//   appId: "1:771182712180:web:3d71bbe8695f3a86010821",
//   measurementId: "G-CVD866MZFP"
// };

const config = {
  apiKey: "AIzaSyBzD9FQQEjxBLYZZh651UaHabD-V7RSNkk",
  authDomain: "car-site-c53db.firebaseapp.com",
  databaseURL: "https://car-site-c53db.firebaseio.com",
  projectId: "car-site-c53db",
  storageBucket: "car-site-c53db.appspot.com",
  messagingSenderId: "245178985282",
  appId: "1:245178985282:web:565af8b724f7f21d"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();


export {
 auth,
 firebase,
};





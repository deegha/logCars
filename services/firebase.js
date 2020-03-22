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
  apiKey: "AIzaSyBHQTKKxYMFiRCw4P6Sw0D4WxiTYAhudVA",
  authDomain: "stories-f32ba.firebaseapp.com",
  databaseURL: "https://stories-f32ba.firebaseio.com",
  projectId: "stories-f32ba",
  storageBucket: "stories-f32ba.appspot.com",
  messagingSenderId: "237074968790",
  appId: "1:237074968790:web:f5a5989c8dacddbaec5977"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();


export {
 auth,
 firebase,
};





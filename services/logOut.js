import firebase from "firebase/app";
import "firebase/auth";

export default async () => {
  try {
    await firebase.auth().signOut()
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

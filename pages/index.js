import { HomePage } from "../views/home-view/home-view"
import firebase from "firebase/app";
import "firebase/firestore";
import usePagination from "firestore-pagination-hook"

const Home = ({ setAndPlay, nowPlaying }) => {

  const db = firebase.firestore();
  const {
    loading,
    loadingError,
    loadingMore,
    loadingMoreError,
    hasMore,
    items,
    loadMore
  } = usePagination(
    db
      .collection("tracks")
      .orderBy("createdAt", "asc"),
    {
      limit: 5
    }
  );

  const nextSong = (preSong) => {

  }

  return (
    <HomePage items={items} setAndPlay={setAndPlay} nowPlaying={nowPlaying} />
  )
}

export default Home

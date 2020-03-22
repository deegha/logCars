import { HomePage } from "../views/home-view/home-view"
import firebase from "firebase/app"
import "firebase/firestore"
import usePagination from "firestore-pagination-hook"
import { useEffect } from "react"

const Home = ({ setAndPlay, nowPlaying, setPlaylist }) => {

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
      .orderBy("createdAt", "desc"),
    {
      limit: 8
    }
  );

  const playListItems = items.map(item => item.data())

  useEffect(() => {
    setPlaylist(playListItems)
  },[playListItems.length])



  return (
    <HomePage
      loadMore={loadMore}
      items={items}
      setAndPlay={setAndPlay}
      loading={loading}
      nowPlaying={nowPlaying}
      hasMore={hasMore}
      loadingMore={loadingMore} />
  )
}

export default Home

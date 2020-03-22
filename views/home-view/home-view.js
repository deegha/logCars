import { useEffect } from "react"
import { Header, Loader, Card } from "../../components"
import "./styles.scss"


export const HomePage = ({ authUser, items, loading, nextPage, noPage, hasMore, setAndPlay, nowPlaying, loadMore, loadingMore }) => {

  useEffect(() => {
    function handleScroll() {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight-100)) {
        if(hasMore) {
          loadMore()
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore]);

  const pageTitle = nowPlaying.title?nowPlaying.title:"Mellow Music"

  return (
    <div>
      <Header authUser={authUser} page={"Home"} title={`Home | ${pageTitle}`}  />
      <div className={"home-container"} >
        <div className={"home-innerWrapper"}>
        {items.map(item => {
          const track = item.data()
          return (
            <Card key={track.url} item={track} setAndPlay={setAndPlay} nowPlaying={nowPlaying} />
          )
        })}

        {loading && <div>Loading Music...</div>}
        {loadingMore && <div>Loading More Music...</div>}
        </div>
        <div className={"home-innerWrapperleft"}>
          <h2>Popular Artists</h2>
        </div>
      </div>
    </div>
  )
}

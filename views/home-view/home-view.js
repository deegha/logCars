import { Header, Loader, Card } from "../../components"
import "./styles.scss"


export const HomePage = ({ authUser, items, loading, nextPage, noPage, setAndPlay, nowPlaying }) => {

  const  scrollCheck = event => {
    const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
    if (bottom) {
      console.log("At The Bottom"); //Add in what you want here
    }
  };

  return (
    <div >
      <Header authUser={authUser} page={"Home"} />
      <div className={"home-container"} onScroll={scrollCheck}>

        <div className={"home-innerWrapper"}>
        {items.map(item => {
          const track = item.data()
          return (
            <Card key={track.url} item={track} setAndPlay={setAndPlay} nowPlaying={nowPlaying} />
          )
        })}

        </div>
        <div className={"home-innerWrapperleft"}>
          <h2>Popular Artists</h2>
        </div>
      </div>
    </div>
  )
}

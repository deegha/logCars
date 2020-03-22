
import  "./styles.scss"
import Link from 'next/link'
import play from "../../static/play-button.svg"

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);

  return string + this;
};

export const Card = ({item, setAndPlay, nowPlaying}) => {

  const title = item.title.length > 24? item.title.substring(0,23)+"..." : item.title
  const isPlaying = nowPlaying.url === item.url
  return (
    <div className={"card-container"} key={item.createdAt.nanoseconds}  >

      <div className={"card-image"} style={{backgroundImage: `url(${item.image.insert(50, "w_400,h_400,c_fill/")})`}} onClick={()=> setAndPlay({
      url: item.url,
      title: item.title,
      image: item.image,
      id: item.url+"-"+item.url
    })}>
        <div className="middle">
        {!isPlaying && <div className="play-button"><img src={play} /></div>}
        </div>
      </div>
      <div className={"card-details"}>
        <div>
          <h1>{title}</h1>
          <p className={"card-details-one"}>{item.genre.name} |
          <Link href={{ pathname: 'profile', query: { name: "userIs" }}}><a>{item.author.displayName}</a></Link>
           <span className={"card-user-image"} style={{backgroundImage: `url(${item.author.photoURL.insert(50, "w_100,h_100,c_fill/")})`}}/></p>
          { isPlaying && (
            <p>
              <span className={"nowPlaying"}>Now Playing</span>
            </p>
          )}

        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

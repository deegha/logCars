
import  "./styles.scss"

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);

  return string + this;
};

export const Card = ({item, setAndPlay, nowPlaying}) => {
  return (
    <div className={"card-container"} key={item.createdAt.nanoseconds} onClick={()=> setAndPlay({
      url: item.url,
      title: item.title,
      image: item.image,
      id: item.url+"-"+item.url
    })} >
      <div className={"card-image"} style={{backgroundImage: `url(${item.image.insert(50, "w_400,h_400,c_fill/")})`}} />
      <div className={"card-details"}>
        <div>
          <h1>{item.title}</h1>
          <p className={"card-details-one"}>{item.genre.name} | {item.author.displayName} <span className={"card-user-image"} style={{backgroundImage: `url(${item.author.photoURL})`}} /></p>
          {nowPlaying.url === item.url && (
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

import { IoIosMusicalNote } from "react-icons/io"
import "./styles.scss"

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);

  return string + this;
};


export const PlayListComponent = ({list, setNowPlaying, nowPlaying}) => {

  return (
    <div className={"play-list_container"}>
      <div className={"play-list_container-header"}>

        Next up
      </div>
      <div className={"play-list_wrapeer"}>
      {list.map( item => (
        <div className={"play-list_item"} onClick={() => setNowPlaying(item)}>
          <IoIosMusicalNote size={18} className={"play-list_icon"} />

          <div className={"play-list_item-details"}>
            <img src={item.image.insert(50, "w_200,h_200,c_fill,f_auto,q_auto/")} />
            <p>
            {item.title}
            </p>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

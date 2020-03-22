import { useState } from "react"
import "./styles.scss"
export const DropDown = ({ list, select, selected, placeHolder }) => {

  const [ listOpen,  setListToggle] = useState(true)

  const toggleList = () => {
    setListToggle(!listOpen)
  }

  const selectItem = (item) => ()=>  {
    toggleList()

    select(item)
  }

  return (
    <div className={"dropDown-ddWrapper"}>
      <div className={"dropDown-ddHeader"} onClick={toggleList}>
        {selected? (
          <div className={"dropDown-ddHeaderTitle"}>{selected}</div>
        ) : (
          <div className={"dropDown-ddHeaderTitlePlaceHolder"}>{placeHolder}</div>
        )}

      </div>
      {listOpen && (
        <ul className={"dropDown-ddList"}>
        {list.map((item) => (
          <li className={"dropDown-ddListItem"} key={item.section}>
            <span className={"dropDown-sectionHeading"}>{item.section}</span>
            <ul>
            {item.data.map( data => (
              <li className={"dropDown-item"} onClick={selectItem(data)} key={data.code} >{data.name}</li>
            ))}
            </ul>
          </li>
          ))}
        </ul>
      )}
    </div>
  )
}

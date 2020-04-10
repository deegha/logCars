import { useState } from "react"
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import "./styles.scss"

export const DropDown = ({ list, select, selected, placeHolder, sreachContext, name }) => {

  const [ listOpen,  setListToggle] = useState(true)

  const toggleList = () => {
    setListToggle(!listOpen)
  }

  const selectItem = (name, item) => ()=>  {
    toggleList()
    select(name, item)
  }

  const clear = (name) => {
    select(name, "")
    setListToggle(true)
  }

  return (
    <div className={"dropDown-ddWrapper"}>
      <div className={"dropDown-ddHeader"}>
        {selected? (
          <div className={"dropDown-ddHeaderTitle"}>{selected}
            <div className="dropDown-ddHeaderTitle-icons-area" onClick={()=> clear(name)}>
              <MdClose className="dropDown-ddHeaderTitle-icon" />
            </div>
            </div>
        ) : (
          <div className={"dropDown-ddHeaderTitlePlaceHolder"}>{placeHolder}</div>
        )}

      </div>
      {listOpen && (
        <ul className={"dropDown-list"}>
        {list.map( (item, i) => (
              <li className={"dropDown-item"} onClick={selectItem(name, item[sreachContext])} key={i} >{item[sreachContext]}</li>
            ))}
        </ul>
      )}
    </div>
  )
}

import { useState } from "react"
import { cars, transmissionArr, fuelTypeArr } from "../../../../services/data"
import { DropDown } from "../../../../components"
import "./styles.scss"

export const Filter = ( { items, setFilterItem, setFilters, filters, clearSelectedMake, clearSelected }) => {
  const [text, setText ] = useState({
    priceMin: "",
    priceMax: "",
    modelYeaMin: "",
    modelYearMax: "",
  })
  let models = []

  if(filters.make && filters.make !== "")
    models = cars.filter(item => item.make === filters.make)[0].models

  const onChangeText = (e) => {
    if(e.target.name === "priceMin" && isNaN(e.target.value) || e.target.name === "priceMax" && isNaN(e.target.value) ) {
      console.log("not a number")
      return
    }
    setText({
      ...text,
      [e.target.name]: e.target.value
    })
  }

  const filter = (e) => {
    e.preventDefault()

    setFilters({
      priceMin: text.priceMin,
      priceMax: text.priceMax,
      modelYeaMin: text.modelYeaMin,
      modelYearMax: text.modelYearMax,
    })
  }

  return (
    <div className="filter-container">
      <form className="filter-form" onSubmit={filter}>
        <div className="filter-item">
          <input className="filter-item-text-field" name="priceMin" placeholder={"Min Price"} onChange={onChangeText} value={text.priceMin} />
        </div>

        <div className="filter-item">
          <input className="filter-item-text-field" name="priceMax" placeholder={"Max Price"} onChange={onChangeText} value={text.priceMax} />
        </div>

        <div className="filter-item">
          <input type="submit" value="filter" className="filter-item-button"/>
        </div>
      </form>

      <div className="filter-item">
        <DropDown list={cars} placeHolder={"Select Make"} sreachContext={'make'} name={"make"}  select={setFilterItem} selected={filters.make !== "" && filters.make} />
      </div>

      {filters.make !== "" && (
         <div className="filter-item">
        <DropDown list={models} placeHolder={"Select Model"} sreachContext={'modelName'} name={"model"} select={setFilterItem} selected={filters.model !== "" && filters.model} />
        </div>
      )}

      <div className="filter-item">
        <DropDown list={transmissionArr} placeHolder={"Transmission"} sreachContext={'transmission'} name={"transmission"}  select={setFilterItem} selected={filters.transmission !== "" && filters.transmission} />
      </div>

      <div className="filter-item">
        <DropDown list={fuelTypeArr} placeHolder={"Fuel"} sreachContext={'type'} name={"fuelType"}  select={setFilterItem} selected={filters.fuelType !== "" && filters.fuelType} />
      </div>


    </div>
  )
}

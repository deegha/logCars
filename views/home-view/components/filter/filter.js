import { useState, useContext } from "react"
import { cars, transmissionArr, fuelTypeArr } from "../../../../services/data"
import { DropDown } from "../../../../components"
import { AppContext } from "../../../../context/app-context"
import { useAlert, types } from 'react-alert'

import "./styles.scss"

export const Filter = ( { setFilterItem}) => {

  const { filterItems, setFilterItems, setFilters, filters } = useContext(AppContext)
  const alert = useAlert()

  let models = []

  if(filters.make && filters.make !== "")
    models = cars.filter(item => item.make === filters.make)[0].models

  const onChangeText = (e) => {
    if(e.target.name === "priceMin" && isNaN(e.target.value) || e.target.name === "priceMax" && isNaN(e.target.value) ) {

      alert.show(e.target.name === "priceMin"?`Minimum price should be a number`: `Maximum price should be a number`, {
        timeout: 3000,
        type: types.ERROR,
      })

      return
    }

    let change = {
      [e.target.name]: e.target.value
    }

    if(e.target.name === "priceMin") {
      change ={
        ...change,
      }
    }

    setFilterItems({
      ...filterItems,
      ...change
    })
  }

  const filter = (e) => {
    e.preventDefault()

    setFilters({
      ...filters,
      priceMin: filterItems.priceMin,
      priceMax: filterItems.priceMax,
      modelYeaMin: filterItems.modelYeaMin,
      modelYearMax: filterItems.modelYearMax,
    })
  }

  return (
    <div className="filter-container">
      <form className="filter-form" onSubmit={filter}>
        <div className="filter-item">
          <input className="filter-item-text-field" name="priceMin" placeholder={"Min Price"} onChange={onChangeText} value={filterItems.priceMin} />
        </div>

        <div className="filter-item">
          <input className="filter-item-text-field" name="priceMax" placeholder={"Max Price"} onChange={onChangeText} value={filterItems.priceMax} />
        </div>

        <div className="filter-item">
          <input className="filter-item-text-field" name="modelYeaMin" placeholder={"Min Year"} onChange={onChangeText} value={filterItems.modelYeaMin} />
        </div>

        <div className="filter-item">
          <input className="filter-item-text-field" name="modelYearMax" placeholder={"Max Year"} onChange={onChangeText} value={filterItems.modelYearMax} />
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

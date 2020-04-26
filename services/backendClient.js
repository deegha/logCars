import * as algoliasearch from 'algoliasearch'
import { APPLICATION_ID, API_KEY } from "../config/config"


export const listFeeds = async ({searchText = "", filters , page}) => {

  const TRACKS_INDEX = "feeds"

  const client = algoliasearch(APPLICATION_ID, API_KEY)
  try {
    let feeds = {}
    let filterArray = []
    let filterString = ""

    const index = client.initIndex(TRACKS_INDEX)

    if(filters.make) {
      filterArray = [...filterArray, {key: 'make', value: filters.make, glue: ':'}]
    }

    if(filters.model) {
      filterArray = [...filterArray, {key: 'modelIndex', value: filters.model.replace(/\s/g, ''), glue: ':'}]
    }

    if(filters.priceMin) {
      filterArray = [...filterArray, {key: 'price', value: filters.priceMin, glue: '>'}]
    }

    if(filters.priceMax) {
      filterArray = [...filterArray, {key: 'price', value: filters.priceMax, glue: '<'}]
    }

    if(filters.transmission) {
      filterArray = [...filterArray, {key: 'transmission', value: filters.transmission, glue: ':'}]
    }

    if(filters.fuelType) { console.log(filters.fuelType, "filters.fuelType")
      filterArray = [...filterArray, {key: 'fuelType', value: filters.fuelType, glue: ':'}]
    }

    if(filters.modelYeaMin) {
      filterArray = [...filterArray, {key: 'modelYear', value: filters.modelYeaMin-1, glue: '>'}]
    }

    if(filters.modelYearMax) {
      filterArray = [...filterArray, {key: 'modelYear', value: filters.modelYearMax+1, glue: '<'}]
    }



    filterArray.map((filter ) => {
      if (filterString === "") {
        filterString = `${filter.key} ${filter.glue} ${filter.value}`
      } else {
        filterString = `${filterString} AND ${filter.key} ${filter.glue} ${filter.value}`
      }
    })

    feeds = await index.search(searchText, {
      filters: filterString,
      page,
      distinct: 0
    })

    return feeds
  } catch (err) {
    console.log(err)
    throw new Error(`Error fetching records ${err}`)
  }
}

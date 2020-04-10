/**
 * Feeds Service
 * Author: Deegha Galkissa
 * Ceated at: 2020/03/23
 */

import * as algoliasearch from 'algoliasearch'

import { config } from '../config'

const TRACKS_INDEX = "feeds"


export interface IFeed {
  location: string,
  make: string,
  milage: string,
  model: string,
  modelYear: string,
  name: string,
  negotiable: boolean,
  phoneNumber: string,
  price: string,
  timeStamp: any,
  title: string,
  transmission: string
}

export interface IFilter {
  key: string,
  value: string,
  glue: string
}

class FeedService {

  private client: any

  createFeedOnAlgolia = async (feeds: IFeed[]) => {
    this.client = algoliasearch(config.APPLICATION_ID, config.API_KEY)
    try {
      console.log("creating new record on algolia")
      const index = this.client.initIndex(TRACKS_INDEX)
      const response = await index.addObjects(feeds)

      return response
    } catch (err) {
      console.log("Error while creating on algolia", err)
      throw new Error(`Error in creating records in algolia ${err}`)
    }
  }

}

export const feedService = new FeedService()

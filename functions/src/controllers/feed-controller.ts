
import { feedService } from "../serivices/feed-service"

class FeedController {

  createItemOnAlgolia = async (snap:any , context: any): Promise<void> => {

    const result = await snap.data()

    await feedService.createFeedOnAlgolia(result)
  }
}

export const feedController = new FeedController()

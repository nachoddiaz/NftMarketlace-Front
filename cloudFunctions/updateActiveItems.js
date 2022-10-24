/* Create a new table called ActiveItem
Add items that are listed in the marketplace
Delete items that are bougth*/

import Moralis from "moralis";

//afterSave do certain thinf when the event is fired
Moralis.Cloud.afterSave("ItemListed", async (request) => {
    //Every event gets triggered twice, once on unconformed and other with confirmed
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info("looking for confirmed TX...")
})
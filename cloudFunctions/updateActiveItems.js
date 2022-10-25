/* Create a new table called ActiveItem
Add items that are listed in the marketplace
Delete items that are bougth*/

import Moralis from "moralis"

//afterSave do certain thinf when the event is fired
Moralis.Cloud.afterSave("ItemListed", async (request) => {
    //Every event gets triggered twice, once on unconformed and other with confirmed
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info("looking for confirmed TX...")
    if (confirmed) {
        logger.info("Found Item")
        //If ActiveItem exists, grab it, if not, create it
        const ActiveItem = Moralis.Object.extend("ActiveItem")
        const activeItem = new ActiveItem()

        activeItem.set("marketplaceAddress", request.object.get("address"))
        activeItem.set("nftAddress", request.object.get("nftAddress"))
        activeItem.set("price", request.object.get("price"))
        activeItem.set("tokenId", request.object.get("tokenId"))
        activeItem.set("seller", request.object.get("seller"))

        logger.info(
            `Adding Address: ${request.object.get("address")}. 
            tokenId:${request.object.get("tokenId")}`
        )
        logger.info("Saving...")
        await activeItem.save()
    }
})

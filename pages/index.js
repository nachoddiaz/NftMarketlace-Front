import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import { useMoralisQuery } from "react-moralis"

export default function Home() {
    /*
     * @notice: We need to show the recently listed NFTs
     * @dev: We have many options:
     *       Create a on-chain array that stores each listing
     *       Take the event emited by the ListItem function, index it off-chain and read it from that server
     * @dev: Decide to take the second option because is cheaper and more flexible
     */

    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        //TableName and a function needed
        "ActiveItem",
        //Grap the first 10 in descending order of the tokenId
        (query) => query.limit(10).descending("tokenId")
    )
    console.log(listedNfts)

    return (
        <div className={styles.container}>
            {fetchingListedNfts ? (
                <div>Loading... </div>
            ) : (
                listedNfts.map((nft) => {
                    console.log(nft.attributes)
                    const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                        nft.attributes
                    return (
                        <NFTBox
                            price={price}
                            nftAddress={nftAddress}
                            tokenId={tokenId}
                            marketplaceAddress={marketplaceAddress}
                            seller={seller}
                            key={`${nftAddress}${tokenId}`}
                        />
                    )
                })
            )}
        </div>
    )
}

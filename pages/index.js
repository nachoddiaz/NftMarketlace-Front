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
        "ActiveItem"
    )

    return <div className={styles.container}>Home Page</div>
}

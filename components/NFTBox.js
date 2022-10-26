import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "constants/abi.jsonNftMarketplace"
//To show correctly the NFT in the front
export default function NFTBox(price, nftAddress, tokenId, marketplaceAddress, seller) {
    const [imageURI, setImageURI] = useState("")
    const {runContractFunction: getTokenURI} = useWeb3Contract({
        abi: nftMarketplaceAbi ,
    })

    async function updateUI(){
        //Get the tokenURI
        //Get the image of that token
    }
}

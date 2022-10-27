import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "constants/abi.jsonNftMarketplace"
import nftAbi from "constants/abi.jsonBasicNFT"

//To show correctly the NFT in the front
export default function NFTBox({price, nftAddress, tokenId, marketplaceAddress, seller}) {
    const {isWeb3Enabled} = useMoralis()
    const [imageURI, setImageURI] = useState("")
    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: tokenId,
        },
    })

    async function updateUI() {
        //Get the tokenURI
        const tokenURI = await getTokenURI()
        console.log(tokenId)
        //Get the image of that token. Need to turn IPFS to HTTPS
        if(tokenURI){

        }
    }

    //We want to updateUI only if "isWeb3Enabled" changes
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])
}

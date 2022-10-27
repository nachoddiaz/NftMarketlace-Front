import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "constants/abi.jsonNftMarketplace"
import nftAbi from "constants/abi.jsonBasicNFT"
import { Image } from "next/image"
import { Card } from "web3uikit"
import { ethers } from "ethers"

//To show correctly the NFT in the front
export default function NFTBox({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
    const { isWeb3Enabled } = useMoralis()
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")

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
        if (tokenURI) {
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            //1.await to get the response 2.wait to get it json
            const tokenURIResponse = await (await fetch(requestURL)).json()
            const imageURI = tokenURIResponse.image //replace("ipfd://", "https://ipfs.io/ipfs/")
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            setImageURI(imageURIURL)
            setTokenName(tokenURIResponse.name)
            setTokenDescription(tokenURIResponse.description)
        }
    }

    //We want to updateUI only if "isWeb3Enabled" changes
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            <div>
                {imageURI ? (
                    <Card title={tokenName} description={tokenDescription}>
                        <div className="flex flex-col items-center ">
                            <div>#{tokenId}</div>
                            <div className="italic text-sm">Owned by {seller}</div>
                            <Image>
                                loader={() => imageURI}
                                src={imageURI}
                                height="200" width="200"
                            </Image>
                            <div className="font-bold">
                                {ethers.utils.formatUnits(price, "ether")} ETH
                            </div>
                        </div>
                    </Card>
                ) : (
                    <div>Loading image...</div>
                )}
            </div>
        </div>
    )
}

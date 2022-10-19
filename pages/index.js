import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from "../components/Header"

  
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NFT MarketPlace</title>
        <meta name="description" content="Home page of the NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Home Page

      <Header>

      </Header>
    </div>
  )
}

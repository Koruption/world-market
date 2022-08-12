import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Container, Row, Col } from '@nextui-org/react';
import { useEffect, useState } from 'react'
import LineChart from '../components/charts/bar-chart'
import LChart from '../components/charts/bar-chart'
import Mapp from '../components/mapping/map'
import Document from '../components/document'
import Deck from '../components/mapping/deck';
import { Market } from '../lib/wmarket';
const vega = require('vega-statistics')

const Home: NextPage = () => {

  const [price, updatePrice] = useState(110.99)
  const [wiener, setWiener] = useState(0);
  const [data, setData] = useState(null as any);

  // console.log(Market.traders.getTraders())

  // useEffect(() => {
  //   //setWiener(get_wiener())
  //   setData(chartData)
  // }, [])


  return (
    <>
      <Deck/>
      {/* <Mapp /> */}
      {/* <LChart /> */}
    </>
  )
}

export default Home

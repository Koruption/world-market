import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MapGL from '../components/mapping/mapgl'
import styles from '../styles/Home.module.css'
import { Container, Row, Col } from '@nextui-org/react';
import MapBx from '../components/mapping/mapbox'
import { useEffect, useState } from 'react'
import LineChart from '../components/charts/bar-chart'
import LChart from '../components/charts/bar-chart'
import Mapp from '../components/mapping/map'
import Document from '../components/document'
const vega = require('vega-statistics')

const choice = <T = any>(arr: Array<T>) => {
  return arr[Math.round(Math.random() * (arr.length - 1))]
}

const get_wiener = (sampleSize: number) => {
  return vega.sampleNormal();
}

namespace Brownian {
  let x0 = 0;

  export const randomWalk = (nStep = 100) => {
    let w: Array<number> = new Array(nStep).fill(1 * x0);
    for (let i = 1; i <= nStep; i++) {
      let yi = choice([-1, 1]);
      w.push(w[i - 1] + (yi / Math.sqrt(nStep)))
    }
    return w;
  }
}

const stochastic_sim = (basePrice: number, updatePrice: (p: number) => void, timeDelta = 1000, iterations = 100) => {
  let iter = 0;
  const interval = setInterval(() => {
    if (iter === iterations) clearInterval(interval);
    return
  })
}


const Home: NextPage = () => {

  const [price, updatePrice] = useState(110.99)
  const [wiener, setWiener] = useState(0);
  const [data, setData] = useState(null as any);
  // useEffect(() => {
  //   //setWiener(get_wiener())
  //   setData(chartData)
  // }, [])


  return (
    <>
      {/* <Document></Document> */}
      <Mapp />
      {/* <LChart /> */}
    </>
    // <>
    //   { wiener }
    // </>
    // <MapBx></MapBx>
    // <div style={{ height: '100vh', width: '100vw'}}>
    // </div>
  )
}

export default Home

import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
// import LineChart from '../components/charts/bar-chart'
// import LChart from '../components/charts/bar-chart'
import Mapp from '../components/mapping/map'
import Deck from '../components/mapping/deck';
import LineChart from '../components/charts/line';
import { Market } from '../lib/wmarket';
// const vega = require('vega-statistics')

const Home: NextPage = () => {

  const lineData = {
    labels: Market.math.uspace(0,100),
    datasets: [{
      label: 'Data',
      // data: Market.math.rspace(1000,1000, 40),
      data: Market.simulations.genRandomWalk(323.22, 500, 80),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }

  return (
    <>
      <LineChart
        props={ lineData }
      />
      {/* <Deck/> */}
      {/* <Mapp /> */}
      {/* <LChart /> */}
    </>
  )
}

export default Home

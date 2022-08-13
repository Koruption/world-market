import { faker } from '@faker-js/faker'
import { Readable, Writable } from 'stream'

export namespace Market {

  export namespace streaming {
    export class Signal<T = any> {
      readonly inStream: Readable
      constructor() {
        this.inStream = new Readable({
          read(size) {},
        });
      }
      send(data?: T) {
        this.inStream.push(data ? JSON.stringify(data) : 'end')
      }
      kill() { this.inStream.push(null) }
    }
    
    export class Listener<T=any> {
      private w: Writable;
      constructor(private cb: (data: T) => void) { 
        this.w = new Writable({
          write(chunk: Buffer, encoding, callback) {
            console.log('st da', chunk.toString())
            try {
              cb(JSON.parse(chunk.toString('utf-8')) as T);
              callback(null)
            }
            catch (err) {
              cb(chunk.toString('utf-8') as T)
              callback(null)
            }
          },
        });
      }
      // listen(s: Readable) { s.pipe(this.w) }
      listen(signal: Signal<T>) { signal.inStream.pipe(this.w) }
    }
  }

  export namespace utils {
    /**
     * `fill` is a function that takes a size and a filler and returns an array of that size filled with
     * the filler
     * @param {number} size - The size of the array you want to create.
     * @param {T | (() => T)} filler - T | (() => T)
     * @returns An array of size `size` filled with `filler`
     */
    export const fill = <T = any>(size: number, filler: T | (() => T)) => {
      let arr = new Array<T>(size).fill(null as any)
      return filler instanceof Function
        ? arr.map(e => filler())
        : arr.map(e => filler)
    }
  }

  export namespace math {
    /**
     * `choice` returns a random element from an array
     * @param arr - Array<T>
     * @returns A function that takes an array of any type and returns a random element from that array.
     */
    export const choice = <T = any>(arr: Array<T>) => {
      return arr[Math.round(Math.random() * (arr.length - 1))]
    }

    /**
     * `srand` returns a random integer between `-symmetricMax` and `symmetricMax` inclusive
     * @param {number} symmetricMax - The maximum value of the random number.
     * @returns A function that takes a number and returns a random number between -symmetricMax and
     * symmetricMax.
     */
    export const srand = (symmetricMax: number, decimals = 2) => {
      const sign = choice([-1, 1])
      return parseFloat(
        (Math.random() * symmetricMax * sign).toPrecision(decimals * 2)
      )
    }

    /**
     * `precision(n: number, dec: number)` returns a number `n` rounded to `dec` decimal places
     * @param {number} n - number - the number to be rounded
     * @param {number} dec - The number of decimal places to round to.
     * @returns the value of p.
     */
    export const precision = (n: number, dec: number) => {
      dec = Math.trunc(dec)
      const p = parseFloat(n.toPrecision(dec))
      return p
    }

    /**
     * `space` takes a start and end value and returns an array of numbers between the start and end
     * values, with a specified number of steps
     * @param {number} start - the starting value of the range
     * @param {number} end - the end of the range
     * @param {number} [steps=10] - number of steps to take between start and end
     * @returns An array of numbers.
     */
    export const space = (start: number, end: number, steps: number = 10) => {
      let stepSize = Math.abs(end - start) / steps
      let lspace: number[] = []
      const sign = Math.sign(end - start)
      for (let i = 0; i <= steps; i++) {
        lspace.push(precision(start + i * stepSize * sign, 4))
      }
      return lspace
    }

    /**
     * `uspace` returns an array of numbers from `start` to `end` with a step size of `1`
     * @param {number} start - the starting value of the range
     * @param {number} end - The end of the range of numbers you want to generate.
     * @returns An array of numbers.
     */
    export const uspace = (start: number, end: number) => {
      const stepSize = 1
      const d = Math.abs(end - start)
      let lspace: number[] = []
      const sign = Math.sign(end - start)
      for (let i = 0; i <= d; i++) {
        lspace.push(precision(start + i * stepSize * sign, 4))
      }
      return lspace
    }

    /**
     * `rspace` returns an array of numbers that are randomly spaced around a given number
     * @param {number} around - the center of the range
     * @param {number} [size=10] - the number of elements in the array
     * @param [noise=0.03] - the amount of randomness in the data
     * @param [dec=5] - number of decimal places
     * @returns An array of numbers.
     */
    export const rspace = (
      around: number,
      size: number = 10,
      noise = 0.03,
      dec = 5
    ) => {
      const a = new Array(size)
        .fill(0)
        .map(e =>
          precision(around + Math.sin(Math.random() * noise) * noise, dec)
        )
      return a
    }

    /**
     * `minmax()` returns the number `n` if it is between `min` and `max`, otherwise it returns `min` if
     * `n` is less than `min`, or `max` if `n` is greater than `max`
     * @param {number} n - The number to be checked
     * @param {number} min - The minimum number that the number can be.
     * @param {number} max - The maximum number that can be returned.
     * @returns The number that is closest to the number passed in.
     */
    export const minmax = (n: number, min: number, max: number) => {
      if (min > max)
        throw new Error('The min must be less than the max in minmax()')
      let a = Math.min(min, n) == min
      let b = Math.max(max, n) == max
      if (a && b) {
        return n
      }
      return a ? Math.min(min, n) : Math.max(max, n)
    }
  }

  export namespace strategies {
    export enum Tendency {
      tech = 'tech',
      commodities = 'commodities',
      collectables = 'collectables',
      energy = 'energy',
      entertainment = 'entertainment',
      aerospace = 'aerospace',
      oilandenergy = 'oilandenergy'
    }
    export interface Strategy {
      doBuy(): boolean
      doSell(): boolean
      isOptimistic(): boolean
    }
    export class Risky implements Strategy {
      doBuy (): boolean {
        throw new Error('Method not implemented.')
      }
      doSell (): boolean {
        throw new Error('Method not implemented.')
      }
      isOptimistic (): boolean {
        throw new Error('Method not implemented.')
      }
    }
    export class Safe implements Strategy {
      doBuy (): boolean {
        throw new Error('Method not implemented.')
      }
      doSell (): boolean {
        throw new Error('Method not implemented.')
      }
      isOptimistic (): boolean {
        throw new Error('Method not implemented.')
      }
    }
    export class Balanced implements Strategy {
      doBuy (): boolean {
        throw new Error('Method not implemented.')
      }
      doSell (): boolean {
        throw new Error('Method not implemented.')
      }
      isOptimistic (): boolean {
        throw new Error('Method not implemented.')
      }
    }
    export class Volatile implements Strategy {
      doBuy (): boolean {
        throw new Error('Method not implemented.')
      }
      doSell (): boolean {
        throw new Error('Method not implemented.')
      }
      isOptimistic (): boolean {
        throw new Error('Method not implemented.')
      }
    }
  }

  export namespace analytics {
    export interface Analytics {
      bankAmount: number
      volume: number
      trades: number
      openBids: number
      openListings: number
    }
  }

  export namespace traders {
    export interface ITrader {
      name: string
      marketTendency: strategies.Tendency
      marketStrategy: strategies.Strategy
      image: string
      analytics: analytics.Analytics
    }

    export class Trader implements ITrader {
      constructor (
        public name: string,
        public marketTendency: strategies.Tendency,
        public marketStrategy: strategies.Strategy,
        public analytics: analytics.Analytics,
        public image: string
      ) {}
    }

    function genTrader () {
      return {
        marketTendency: math.choice(Object.values(strategies.Tendency)),
        name: faker.internet.userName(),
        bankAmount: Math.random() * 10000,
        marketStrategy: ''
      }
    }

    // export const getTraders = (amnt: number = 12) => {
    //     let traders = [];
    //     for (let i = 0; i < amnt; i++) {
    //         traders.push({
    //             name: faker.
    //         })
    //     }
    // }
  }

  export namespace simulations {
    /**
     * `randomWalk` takes a starting price, a number of time steps, and a symmetric randomness parameter,
     * and returns an array of prices
     * @param {number} startPrice - the starting price of the stock
     * @param [timeSteps=100] - number of time steps to simulate
     * @param [symRand=0] - the amount of randomness in the walk.
     * @returns An array of numbers.
     */
    export const genRandomWalk = (
      startPrice: number,
      timeSteps = 100,
      symRand = 0
    ) => {
      let t = [-1, 0, 1]
      let w = [startPrice]
      for (let i = 1; i <= timeSteps; i++) {
        let yi = math.choice(t)
        w.push(w[i - 1] + yi + Math.random() * symRand * yi)
      }
      return w
    }

    export class Walk {

      protected t: number[] = [-1, 0, 1]
      protected current: number;
      readonly hasStarted;

      constructor(public startPrice: number,
        public timeSteps = 100,
        public symRand = 0) {
        this.hasStarted = true;
        this.current = startPrice;
      }
      
      getNext() {
        const yi = math.choice(this.t)
        const r = math.precision(Math.random() +  this.symRand * yi, 4)
        this.current = math.precision(this.current + yi + r, 5);
        return this.current;
      }
    }

    export class Stock {
      static readonly TIME_STEPS = 2000
      static readonly SIM_LIFETIME = (1.8 * Math.pow(10,6))/1000 // 30 minutes
      static readonly DELTA_TIME = 300
      private interval?: NodeJS.Timer;
      protected walk: Walk;
      protected priceStream: streaming.Signal<number>;
      startTime: number = 0;
      currentPrice: number = 0;
      prevPrice: number = 0;

      constructor(public readonly startPrice: number, public stockFlux = 0) {
        console.log('Building stock...')
        this.walk = new Walk(startPrice, Stock.TIME_STEPS, stockFlux);
        this.currentPrice = startPrice;
        this.priceStream = new streaming.Signal<number>();
        this.startTime = new Date().getTime() / 1000;
      }

      start () {
        this.interval = setInterval(() => {
          this.updatePrice();
        }, Stock.DELTA_TIME)
        setTimeout(() => {
          stock.stop()
        }, Stock.SIM_LIFETIME)
      }

      stop() {
        clearInterval(this.interval);
        console.log('The stock sim was killed.')
      }

      onPriceChange(cb: (price: number) => void | Promise<void>) {
        const listener = new streaming.Listener<number>(cb)
        listener.listen(this.priceStream)
      }

      timeSinceStart() {
        return this.startTime - new Date().getTime() / 1000;
      }

      protected updatePrice() {
        if (this.timeSinceStart() > Stock.SIM_LIFETIME) { 
          this.stop();
          return
        }
        this.prevPrice = this.currentPrice;
        this.currentPrice = this.walk.getNext();
        this.priceStream.send(this.currentPrice)
      }
    }
  }
}


const stock = new Market.simulations.Stock(214.22, 40.02)
stock.start()
stock.onPriceChange((price) => {
  console.log('new price: ', price)
})
  
setTimeout(() => {
  stock.stop()
}, 5000)
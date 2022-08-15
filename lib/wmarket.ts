import { faker } from '@faker-js/faker'
import { Readable, Writable } from 'stream'

export namespace Market {
/**
 * A simple implementation of a signal/listener pattern.
 */
  export namespace streaming {
    export class Signal<T = any> {
      readonly inStream: Readable
      constructor () {
        this.inStream = new Readable({
          read (size) {}
        })
      }
      send (data?: T) {
        this.inStream.push(data ? JSON.stringify(data) : 'end')
      }
      kill () {
        this.inStream.push(null)
      }
    }

    export class Listener<T = any> {
      private w: Writable
      constructor (private cb: (data: T) => void) {
        this.w = new Writable({
          write (chunk: Buffer, encoding, callback) {
            try {
              cb(JSON.parse(chunk.toString('utf-8')) as T)
              callback(null)
            } catch (err) {
              cb(chunk.toString('utf-8') as T)
              callback(null)
            }
          }
        })
      }
      // listen(s: Readable) { s.pipe(this.w) }
      listen (signal: Signal<T>) {
        signal.inStream.pipe(this.w)
      }
    }
  }

  export namespace time {
    export const msFromMinutes = (minutes: number) => {
      return minutes*60*1000
    }
    export const msFromSeconds = (seconds: number) => {
      return seconds*1000
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

/**
 * `repeat` is a function that takes in a number of times to repeat, a speed, and a callback function,
 * and then executes the callback function the number of times specified at the speed specified.
 * @param {number} nTimes - The number of times you want to repeat the callback function.
 * @param {number} speed - The speed at which the function will be called.
 * @param cb - callback function
 * @returns the interval
 */
    export const repeatNTimes = (nTimes: number, speed: number, cb: () => void) => {
      var iteration = 0;
      var interval = setInterval(() => {
        if (iteration >= nTimes) clearInterval(interval);
        console.log(`Iteration: ${iteration}`)
        iteration += 1;
        cb();
      }, speed)
      return interval
    }

/**
 * `repeatForDuration` is a function that takes in a duration, speed, and callback function and repeats
 * the callback function for the duration of time at the speed specified.
 * 
 * Here's an example of how to use it:
 * 
 *     repeatForDuration(5000, 1000, () => {
 *       console.log('Hello World')
 *     })
 * 
 * This will print out "Hello World" every second for 5 seconds.
 * @param {number} duration - The duration of the interval in milliseconds
 * @param {number} speed - The speed at which the callback function is called.
 * @param cb - callback function
 * @returns the interval
 */
    export const repeatForDuration = (duration: number, speed: number, cb: () => void) => {
      var currTime = new Date().getTime();
      var initTime = new Date().getTime();
      var interval = setInterval(() => {
        if (currTime >= initTime+duration) clearInterval(interval);
        console.log(`Current Time: ${currTime}`)
        currTime = new Date().getTime()
        cb();
      }, speed)
      return interval;
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
    export const srand = (symmetricMax: number, decimals = 5) => {
      const sign = choice([-1, 1])
      return parseFloat(
        (Math.random() * symmetricMax * sign).toPrecision(decimals)
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

    /**
     * "The Box-Muller transform is a method for generating normally distributed random numbers from
     * uniformly distributed random numbers."
     * The Box-Muller transform is a method for generating
     * @returns An array of two numbers.
     */
    const bolMullerPolar = () => {
      /**
       * Using polar version of Box-Muller
       */
      let x1 = srand(1)
      let x2 = srand(1)
      let w = 0
      w = x1 ** 2 + x2 ** 2
      while (w >= 1) {
        x1 = srand(1)
        x2 = srand(1)
        w = x1 ** 2 + x2 ** 2
      }
      w = Math.sqrt((-2 * Math.log(w)) / w)
      return [x1 * w, x2 * w]
    }

    /**
     * `boxMuller` is a function that returns an array of two numbers, each of which is a random number
     * drawn from a normal distribution with mean 0 and standard deviation 1.
     *
     * The function is named after the two mathematicians who invented it, George Edward Pelham Box and
     * Mervin Edgar Muller.
     *
     * The function is based on the fact that if you have two independent random numbers, each drawn from a
     * uniform distribution on the interval [0,1], then the square root of the product of those two numbers
     * is distributed according to the Rayleigh distribution.
     *
     * The Rayleigh distribution is a special case of the chi-squared distribution, which is a special case
     * of the gamma distribution.
     *
     * The gamma distribution is the distribution of the sum of the squares of k independent standard
     * normal random variables.
     *
     * The chi-squared distribution is the distribution of the sum of the squares of k
     * @returns An array of two numbers.
     */
    const boxMuller = () => {
      const u1 = Math.random()
      const u2 = Math.random()
      const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2)
      const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2)
      return [z0, z1]
    }

    /**
     * `normal` returns a random sample from a normal distribution with a mean of `mu` and a standard
     * deviation of `sigma`
     * @param {number} mu - mean
     * @param {number} sigma - standard deviation
     * @param {number} [size=1] - number of samples to return
     * @returns A random number from a normal distribution.
     */
    export const normal = (mu: number, sigma: number, size: number = 1) => {
      if (size == 1) {
        const r = boxMuller()
        return r[0] * sigma + mu
      }
      const samples = []
      for (let i = 0; i < size; i++) {
        const r = boxMuller()
        samples.push(r[0] * sigma + mu)
      }
      return samples
    }

    /**
     * It takes an array of numbers and returns a map of the frequency of each number in the array.
     *
     * The function has an optional parameter called autoRound. If autoRound is set to true, the
     * function will round each number in the array to the nearest integer.
     *
     * The function returns a map of the frequency of each number in the array.
     *
     * Here's an example of how to use the function:
     *
     * const nums = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8, 9.9, 10.1, 11.1, 12.2, 13.3, 14.4, 15.5,
     * 16.6, 17.7, 18.8, 19.9, 20.1];
     *
     * const freqMap = frequency(nums);
     * @param {number[]} nums - The array of numbers you want to find the frequency of.
     * @param [autoRound=true] - If true, the numbers will be rounded to the nearest integer.
     * @returns A map of the frequency of each number in the array.
     */
    export const frequency = (nums: number[], autoRound = true) => {
      nums = autoRound ? nums.map(r => Math.round(r)) : nums
      let freqMap: Map<number, number> = new Map<number, number>()
      nums.sort()
      for (let i = 0; i < nums.length; i++) {
        if (freqMap.has(nums[i])) {
          freqMap.set(nums[i], freqMap.get(nums[i])! + 1)
          continue
        }
        freqMap.set(nums[i], 1)
      }
      return freqMap
    }

    /**
     * It takes an array of numbers and returns an array of numbers where each number is the product of all
     * the numbers in the original array up to and including the current number.
     *
     * Here's an example of the function in action:
     *
     *     cumprod([1, 2, 3, 4, 5])
     *     // [1, 2, 6, 24, 120]
     *
     * Here's a breakdown of the function:
     *
     *     export const cumprod = (arr: number[]) => {
     *       let prevProd = 1;
     *       return arr.map((val: number, index: number) => {
     *         if (index != 0) {
     *           prevProd = val * prevProd;
     *           return prevProd
     *         }
     *         prevProd = val;
     *         return val
     *       })
     * @param {number[]} arr - number[] - The array to be operated on
     * @returns An array of numbers.
     */
    export const cumprod = (arr: number[]) => {
      let prevProd = 1
      return arr.map((val: number, index: number) => {
        if (index != 0) {
          prevProd = val * prevProd
          return prevProd
        }
        prevProd = val
        return val
      })
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

    /**
     * `genGeoBrownian` generates a geometric Brownian motion path with a given start price, drift,
     * volatility, and number of steps.
     *
     * The function takes four arguments:
     *
     * - `startPrice`: the starting price of the path
     * - `mu`: the drift of the path (mu>0) -> bullish, (mu<0) -> bearish
     * - `sigma`: the volatility of the path
     * - `size`: the number of steps in the path
     *
     * The function returns an array of prices. If `size` is greater than 1, the array will contain
     * `size` prices. If `size` is 1, the array will contain a single price.
     *
     * The function uses the `math.normal` function from the `mathjs` library to generate a random
     * path. The `math.normal` function takes three arguments:
     *
     * - `mu`: the mean of the distribution
     * - `
     * @param {number} startPrice - The starting price of the stock
     * @param {number} mu - drift
     * @param {number} sigma - volatility
     * @param [size=1] - number of paths to generate
     * @returns An array of numbers.
     */
    export const genGeoBrownian = (
      startPrice: number,
      mu: number,
      sigma: number,
      size = 1
    ) => {
      if (size > 1) {
        const paths: Array<number> = math.normal(mu, sigma, size) as number[]
        const prices = math
          .cumprod(paths.map(path => 1 + path))
          .map(p => p * startPrice)
        return prices
      }
      const path: number = math.normal(mu, sigma, 1) as number
      const price = (1 + path) * startPrice
      return price
    }

    export abstract class Simulation {
      protected current: number

      private static _MARKET_TREND: 'bullish' | 'bearish' = 'bullish'
      readonly hasStarted

/**
 * @param {number} startPrice - the starting price of the stock
 * @param {number} sigma - the volatility of the stock
 * @param [timeSteps=100] - The number of time steps to simulate.
 */
      constructor (
        public startPrice: number,
        protected sigma: number,
        timeSteps = 100
      ) {
        this.hasStarted = true
        this.current = startPrice
      }

      static get marketTrend () {
        return Simulation._MARKET_TREND
      }

      /**
       * This function sets the market trend to either bullish or bearish.
       * `Note` this is a global change, all simulations will react
       * accordingly.
       * @param {'bullish' | 'bearish'} trend - 'bullish' | 'bearish'
       */
      static forceTrend (trend: 'bullish' | 'bearish') {
        Simulation._MARKET_TREND = trend
      }

      /**
       * "This function takes a number as an argument and sets the volatility of the option to that number."
       *
       * The function is called "forceVolatility" because it forces the volatility of the option to a
       * specific value.
       * @param {number} sigma - number - the volatility of the underlying asset
       */
      forceVolatility (sigma: number) {
        this.sigma = sigma
      }

      isBullish () {
        return Simulation.marketTrend === 'bullish'
      }

      isBearish () {
        return Simulation.marketTrend === 'bearish'
      }

      abstract getNext (): number
    }

    export class Walk extends Simulation {
      protected t: number[] = [-1, 0, 1]
      public symRand = 0.3

      getNext () {
        const yi = math.choice(this.t)
        const r = math.precision(Math.random() + this.symRand * yi, 4)
        this.current = math.precision(this.current + yi + r, 5)
        return this.current
      }
    }

    export class Brownian extends Simulation {
      // private _prices: number[]
      private currIndex

/**
 * @param {number} startPrice - number = 100,
 * @param {number} [mu=0.001] - drift
 * @param {number} [sigma=0.01] - standard deviation of the underlying asset
 * @param {number} [timeSteps=100] - number = 100
 */
      constructor (
        startPrice: number,
        private mu: number = 0.001,
        sigma: number = 0.01,
        timeSteps: number = 100
      ) {
        super(startPrice, sigma, timeSteps)
        // this._prices = []
        // this._prices = genGeoBrownian(startPrice, mu, sigma, 1000)
        this.currIndex = 0
      }
      getNext (): number {
        // this.current = this._prices[this.currIndex + 1];
        const _mu = this.isBullish() ? this.mu : -this.mu
        this.current = genGeoBrownian(
          this.startPrice,
          _mu,
          this.sigma
        ) as number
        return this.current
      }
    }

    export class Stock {
      static readonly TIME_STEPS = 2000
      static readonly SIM_LIFETIME = time.msFromMinutes(30)
      static readonly DELTA_TIME = 300
      private interval?: NodeJS.Timer
      protected sim: Brownian
      protected priceStream: streaming.Signal<number>
      startTime: number = 0
      currentPrice: number = 0
      prevPrice: number = 0

/**
 * @param {number} startPrice - The starting price of the stock
 * @param {number} drift - the expected return of the stock
 * @param {number} volatility - The standard deviation of the stock's price.
 */
      constructor (public readonly startPrice: number, drift: number, volatility: number) {
        console.log('Building stock...')
        this.sim = new Brownian(startPrice, drift, volatility)
        this.currentPrice = startPrice
        this.priceStream = new streaming.Signal<number>()
        this.startTime = new Date().getTime() / 1000
      }

      start() {
        this.interval = utils.repeatForDuration(Stock.SIM_LIFETIME, Stock.DELTA_TIME, this.updatePrice)
      }

      stop () {
        clearInterval(this.interval)
        console.log('The stock sim was killed.')
      }

      onPriceChange (cb: (price: number) => void | Promise<void>) {
        const listener = new streaming.Listener<number>(cb)
        listener.listen(this.priceStream)
      }

      timeSinceStart () {
        return this.startTime - new Date().getTime() / 1000
      }

      protected updatePrice () {
        if (this.timeSinceStart() > Stock.SIM_LIFETIME) {
          this.stop()
          return
        }
        this.prevPrice = this.currentPrice
        this.currentPrice = this.sim.getNext()
        this.priceStream.send(this.currentPrice)
      }
    }
  }
}

// const stock = new Market.simulations.Stock(214.22, 40.02)
// stock.start()
// stock.onPriceChange((price) => {
//   console.log('new price: ', price)
// })

// setTimeout(() => {
//   stock.stop()
// }, 5000)

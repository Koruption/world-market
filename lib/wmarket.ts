import { faker } from '@faker-js/faker'

export namespace Market {

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
         * `sRand` returns a random integer between `-symmetricMax` and `symmetricMax` inclusive
         * @param {number} symmetricMax - The maximum value of the random number.
         * @returns A function that takes a number and returns a random number between -symmetricMax and
         * symmetricMax.
         */
        export const sRand = (symmetricMax: number, decimals = 2) => {
            const sign = choice([-1, 1]);
            return parseFloat((Math.random() * symmetricMax * sign).toPrecision(decimals * 2))
        }
        //   export const get_wiener = (sampleSize: number) => {
        //     return vega.sampleNormal();
        //   }
    }

    export namespace strategies {
        export enum Tendency {
            tech = "tech",
            commodities = "commodities",
            collectables = "collectables",
            energy = "energy",
            entertainment = "entertainment",
            aerospace = "aerospace",
            oilandenergy = "oilandenergy"
        }
        export interface Strategy {
            doBuy(): boolean;
            doSell(): boolean;
            isOptimistic(): boolean;
        }
        export class Risky implements Strategy {
            doBuy(): boolean {
                throw new Error('Method not implemented.');
            }
            doSell(): boolean {
                throw new Error('Method not implemented.');
            }
            isOptimistic(): boolean {
                throw new Error('Method not implemented.');
            }
        }
        export class Safe implements Strategy {
            doBuy(): boolean {
                throw new Error('Method not implemented.');
            }
            doSell(): boolean {
                throw new Error('Method not implemented.');
            }
            isOptimistic(): boolean {
                throw new Error('Method not implemented.');
            }
        }
        export class Balanced implements Strategy {
            doBuy(): boolean {
                throw new Error('Method not implemented.');
            }
            doSell(): boolean {
                throw new Error('Method not implemented.');
            }
            isOptimistic(): boolean {
                throw new Error('Method not implemented.');
            }
        }
        export class Volatile implements Strategy {
            doBuy(): boolean {
                throw new Error('Method not implemented.');
            }
            doSell(): boolean {
                throw new Error('Method not implemented.');
            }
            isOptimistic(): boolean {
                throw new Error('Method not implemented.');
            }
        }
    }

    export namespace analytics {
        export interface Analytics {
            bankAmount: number;
            volume: number;
            trades: number;
            openBids: number;
            openListings: number;
        }
    }

    export namespace traders {
        
        export interface ITrader {
            name: string;
            marketTendency: strategies.Tendency;
            marketStrategy: strategies.Strategy;
            image: string;
            analytics: analytics.Analytics;
        }

        export class Trader implements ITrader {
            constructor(
                public name: string,
                public marketTendency: strategies.Tendency,
                public marketStrategy: strategies.Strategy,
                public analytics: analytics.Analytics,
                public image: string
            ) {}
        }
        function genTrader() {
            return {
                marketTendency: math.choice(Object.values(strategies.Tendency)),
                name: faker.internet.userName(),
                bankAmount: Math.random() * 10000,
                marketStrategy: '',

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

    let x0 = 0;

    export const randomWalk = (nStep = 100) => {
        let w: Array<number> = new Array(nStep).fill(1 * x0);
        for (let i = 1; i <= nStep; i++) {
            let yi = math.choice([-1, 1]);
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
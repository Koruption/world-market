export namespace WMarket {

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
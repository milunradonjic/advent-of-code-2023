import * as fs from 'fs'

function main() {
    const pairs = fs.readFileSync('src/day04/input.txt', 'utf8')
        .split('\n')
        .map(x => {
            const [lottery, myNumbers] = x.split(':')[1].split('|')
            return [lottery.match(/\d+/g), myNumbers.match(/\d+/g)]
        })
    
    let adds = new Array(pairs.length).fill(1) // 1 because we count the lottery itself

    for (let i = 0; i < pairs.length; i++) {
        const lottery = pairs[i][0]
        const myNumbers = pairs[i][1]

        let count = 0

        for (const number of myNumbers) {
            if (lottery.includes(number)) {
                count++
            }
        }

        for (let j = i+1, k = 0; j < adds.length && k < count; j++, k++) {
            adds[j] = adds[j] + adds[i]
        }
    }

    return adds.reduce((acc, cur) => acc + cur, 0)
}

const res = main()
console.log('Result:', res)
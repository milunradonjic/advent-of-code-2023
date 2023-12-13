import * as fs from 'fs'

function main() {
    const pairs = fs.readFileSync('src/day04/input.txt', 'utf8')
        .split('\n')
        .map(x => {
            const [lottery, myNumbers] = x.split(':')[1].split('|')
            return [lottery.match(/\d+/g), myNumbers.match(/\d+/g)]
        })
    
    let res = 0

    for (let i = 0; i < pairs.length; i++) {
        const lottery = pairs[i][0]
        const myNumbers = pairs[i][1]
        let sum = 0

        for (const number of myNumbers) {
            if (lottery.includes(number)) {
                if (sum) sum *= 2
                else sum++
            }
        
        }

        res += sum
    }

    return res
}

const res = main()
console.log('Result:', res)
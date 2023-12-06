import * as fs from 'fs'

const DIGITS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const REVERSED_DIGITS = DIGITS.map(d => d.split('').reverse().join(''))

/**
 * https://adventofcode.com/2023/day/1
 * Part B
 * @returns number
 */
function main() {
    return fs.readFileSync('src/day01/input.txt', 'utf8')
        .split('\n')
        .map(str => {
            return [
                str.match(new RegExp(DIGITS.join('|')))[0],
                str.split('').reverse().join('')
                    .match(new RegExp(REVERSED_DIGITS.join('|')))[0]
                    .split('').reverse().join('')
            ]
        })
        .reduce((acc, arr) => acc += match(arr[0]) * 10 + match(arr[1]), 0)
}

function match(str: string): number {
    switch (str) {
        case 'one': return 1
        case 'two': return 2
        case 'three': return 3
        case 'four': return 4
        case 'five': return 5
        case 'six': return 6
        case 'seven': return 7
        case 'eight': return 8
        case 'nine': return 9
        default: return parseInt(str)
    }
}

const res = main()
console.log('Result:', res)

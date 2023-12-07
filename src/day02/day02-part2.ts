import * as fs from 'fs'

const regex = (color: string) => new RegExp(`(?<=\\s)(\\d*)(?=\\s${color})`, 'g')
const COLORS = ['red', 'green', 'blue']

/**
 * https://adventofcode.com/2023/day/2
 * @returns sum of powers  
 */
function main() {
    return fs.readFileSync('src/day02/input.txt', 'utf8')
        .split('\n')
        .map((line) => (
            COLORS.map(color => Math.max(...line.match(regex(color)).map(match => parseInt(match))))
                .reduce((acc, value) => acc *= value, 1)
        )) 
        .reduce((acc, value) => acc += value, 0)
}

const res = main()
console.log('Result:', res)
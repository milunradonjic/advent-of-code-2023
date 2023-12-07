import * as fs from 'fs'

const regex = (color: string) => new RegExp(`(?<=\\s)(\\d*)(?=\\s${color})`, 'g')

type ColorConfig = { color: 'red' | 'green' | 'blue', value: number }
const COLORS_CONFIG: ColorConfig[] = [
    { color: 'red', value: 12 },
    { color: 'green', value: 13 },
    { color: 'blue', value: 14 },
]

/**
 * https://adventofcode.com/2023/day/2
 * configuration 12 red cubes, 13 green cubes, and 14 blue cubes
 * @returns sum of game ids that satisfy conditions  
 */
function main() {
    return fs.readFileSync('src/day02/input.txt', 'utf8')
        .split('\n')
        .map((line, ind) => COLORS_CONFIG.some(color => validate(line, color)) ? 0 : ind + 1) // Game ID = ind + 1
        .reduce((acc, value) => acc += value, 0)
}

function validate(line: string, colorConfig: ColorConfig) {
    return line.match(regex(colorConfig.color))
        .some((match) => parseInt(match) > colorConfig.value)
}

const res = main()
console.log('Result:', res)
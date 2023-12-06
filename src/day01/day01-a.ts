import * as fs from 'fs'

/**
 * https://adventofcode.com/2023/day/1
 * @returns number
 */
function main() {
    const input = fs.readFileSync('src/day01/input.txt', 'utf8')
    const inputArr = input.split('\n')

    let sum = 0

    for (const str of inputArr) {

        let startInd = 0
        let endInd = str.length - 1

        let tens = 0
        let ones = 0
 
        while ((!tens || !ones) && startInd <= endInd) {
            if (!tens) {
                const startNum = parseInt(str[startInd])
                startInd++
                if (!isNaN(startNum)) {
                    tens = startNum * 10
                }
            }

            if (!ones) {
                const endNum = parseInt(str[endInd])
                endInd--
                if (!isNaN(endNum)) {
                    ones = endNum
                }
            }
        }

        if (tens && !ones) ones = tens / 10
        if (!tens && ones) tens = ones * 10

        sum += tens + ones
    }

    return sum
}

function main2() {
    return fs.readFileSync('src/day01/input.txt', 'utf8')
        .split('\n')
        .map(str => str.replace(/\D/g, ""))
        .reduce((acc, str) => acc += parseInt(str[0] + str[str.length - 1]), 0)
}

const res = main()
console.log('Result:', res)

const res2 = main2()
console.log('Result 2:', res2)
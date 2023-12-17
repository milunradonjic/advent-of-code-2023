import * as fs from 'fs'
import * as os from 'os'

function main() {
    const sections = fs.readFileSync('src/day05/input.txt', 'utf8').split(os.EOL + os.EOL)

    const sectionNumbers = sections.map((section, ind) => {
        if (ind === 0) return section.split(': ')[1].split(' ').map(num => Number(num))
        return section.split(':' + os.EOL)[1].split(os.EOL).map(row => row.split(' ').map(num => Number(num)))
    })
    const seeds = sectionNumbers.shift() as number[]

    let minLocation = Number.MAX_SAFE_INTEGER

    for (const seed of seeds) {
        let number = seed

        for (const section of sectionNumbers) {
            number = getMatchedValue(number, section as number[][])
        }

        if (number < minLocation) {
            minLocation = number
        }        
    }

    return minLocation
}

function getMatchedValue(number: number, section: number[][]) {
    let match = -1

    for (const row of section) {
        const range = row[2]

        const sourceStart = row[1]
        const sourceEnd = sourceStart + range - 1
        
        const destinationStart = row[0]

        if (number >= sourceStart && number <= sourceEnd) {
            match = destinationStart + (number - sourceStart)
            break
        }
    }

    return match !== -1 ? match : number
}

const res = main()
console.log('Result:', res)
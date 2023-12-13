import * as fs from 'fs'

function main() {
    const lines = fs.readFileSync('src/day03/input.txt', 'utf8').split('\n')

    const set = new Set<string>()

    for (let row = 0; row < lines.length; row++) {
        const line = lines[row]
        for (let col = 0; col < line.length; col++) {
            if (!/[^\w\s.]/g.test(line[col])) continue

            if (row > 0) {
                set.add(`${row-1}-${col-1}`) // upper left
                set.add(`${row-1}-${col}`) // upper center
                set.add(`${row-1}-${col+1}`) // upper right
            }

            set.add(`${row}-${col-1}`) // center left
            set.add(`${row}-${col+1}`) // center right

            if (row < lines.length - 1) {
                set.add(`${row+1}-${col-1}`) // lower left
                set.add(`${row+1}-${col}`) // lower center
                set.add(`${row+1}-${col+1}`) // lower right
            }
        }
    }

    let sum = 0

    let used = new Set<string>()

    for (let el of set) {
        if (used.has(el)) continue

        const [row, col] = el.split('-').map(x => Number(x))

        if (!/\d/.test(lines[row][col])) continue

        let number = ''

        for (let leftCol = col; /\d/.test(lines[row][leftCol]); leftCol--) {
            number = lines[row][leftCol] + number 
            used.add(`${row}-${leftCol}`)
        }
        for (let rightCol = col + 1; /\d/.test(lines[row][rightCol]); rightCol++) {
            number = number + lines[row][rightCol]
            used.add(`${row}-${rightCol}`)
        }

        sum += Number(number) ? Number(number) : 0
    }

    return sum
}

const res = main()
console.log('Result:', res)
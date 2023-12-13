import * as fs from 'fs'

function main() {
    const lines = fs.readFileSync('src/day03/input.txt', 'utf8').split('\n')

    const pairs: string[][] = []

    for (let row = 0; row < lines.length; row++) {
        const line = lines[row]

        for (let col = 0; col < line.length; col++) {
            const tempPair: string[] = []

            if (line[col] !== "*") continue

            let hasPrev = false
            if (row > 0) {
                if (/\d/.test(lines[row-1][col-1])) {
                    hasPrev = true
                    tempPair.push(`${row-1}-${col-1}`)
                } 
                if (/\d/.test(lines[row-1][col])) {
                    if (!hasPrev) {
                        hasPrev = true
                        tempPair.push(`${row-1}-${col}`)
                    }
                } else {
                    hasPrev = false
                }
                if (/\d/.test(lines[row-1][col+1]) && !hasPrev) {
                    tempPair.push(`${row-1}-${col+1}`)
                }
            }

            if (/\d/.test(lines[row][col-1])) {
                tempPair.push(`${row}-${col-1}`)
            }
            if (/\d/.test(lines[row][col+1])) {
                tempPair.push(`${row}-${col+1}`)
            }

            hasPrev = false
            if (row < lines.length - 1) {
                if (/\d/g.test(lines[row+1][col-1])) {
                    hasPrev = true
                    tempPair.push(`${row+1}-${col-1}`)
                }
                if (/\d/.test(lines[row+1][col])) {
                    if (!hasPrev) {
                        hasPrev = true
                        tempPair.push(`${row+1}-${col}`)
                    }
                } else {
                    hasPrev = false
                }
                if (/\d/.test(lines[row+1][col+1]) && !hasPrev) {
                    tempPair.push(`${row+1}-${col+1}`)
                }
            }

            if (tempPair.length !== 2) continue 

            pairs.push(tempPair)
        }
    }

    let sum = 0


    for (let pair of pairs) {
        const [index1, index2] = pair
        const [row1, col1] = index1.split('-').map(x => Number(x))
        const [row2, col2] = index2.split('-').map(x => Number(x))

        let number1 = ''
        let number2 = ''

        for (let leftCol = col1; /\d/.test(lines[row1][leftCol]); leftCol--) {
            number1 = lines[row1][leftCol] + number1
        }
        for (let rightCol = col1 + 1; /\d/.test(lines[row1][rightCol]); rightCol++) {
            number1 = number1 + lines[row1][rightCol]
        }

        for (let leftCol = col2; /\d/.test(lines[row2][leftCol]); leftCol--) {
            number2 = lines[row2][leftCol] + number2
        }
        for (let rightCol = col2 + 1; /\d/.test(lines[row2][rightCol]); rightCol++) {
            number2 = number2 + lines[row2][rightCol]
        }

        sum += Number(number1) * Number(number2)
    }

    return sum
}

const res = main()
console.log('Result:', res)
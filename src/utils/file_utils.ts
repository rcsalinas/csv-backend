import * as fs from 'fs'
import csvParser from 'csv-parser'
import type { CsvRow } from '../types/CsvRow'

export const deleteFiles = async (directory: string): Promise<void> => {
    try {
        const files = await fs.promises.readdir(directory)

        for (const file of files) {
            await fs.promises.unlink(`${directory}/${file}`)
            console.log(`Deleted file: ${file}`)
        }
    } catch (err) {
        console.error('Error deleting files:', err)
    }
}

export async function processDataFromCSV(
    file: { path: string },
    data: CsvRow[]
): Promise<void> {
    await new Promise<void>((resolve, reject) => {
        fs.createReadStream(file.path)
            .pipe(csvParser())
            .on('data', (row: CsvRow) => {
                const exists = data.some((existingRow) => {
                    return existingRow.name === row.name
                })
                if (!exists) {
                    data.push(row)
                }
            })
            .on('end', () => {
                console.log('CSV data:', data)
                resolve()
            })
            .on('error', (error) => {
                reject(error)
            })
    })
}

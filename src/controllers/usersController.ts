import type { Request, Response } from 'express'
import type { CsvRow } from '../types/CsvRow'
import { csvData } from '../data/csvData'

const data: CsvRow[] = csvData as CsvRow[]

export const searchUsers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const query = req.query.q

    if (typeof query !== 'string' && query !== null && query !== undefined) {
        return res.status(500).json({ message: 'Invalid search query' })
    }
    if (query === null || query === undefined || query === '') {
        return res.status(200).json({ data })
    }

    const results = data.filter((row) => {
        for (const key in row) {
            if (row[key].toLowerCase().includes(query.toLowerCase())) {
                return true
            }
        }
        return false
    })

    if (results.length === 0) {
        return res.status(200).json({ data: [] })
    }

    return res.status(200).json({ data: results })
}

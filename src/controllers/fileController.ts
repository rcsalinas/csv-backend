import type { Request, Response } from 'express'

import type { CsvRow } from '../types/CsvRow'
import { csvData } from '../data/csvData'
import { deleteFiles, processDataFromCSV } from '../utils/file_utils'

const data: CsvRow[] = csvData as CsvRow[]

export const uploadFile = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const file = req.file
    if (file === null || file === undefined) {
        return res.status(500).json({ message: 'No file uploaded' })
    }

    await processDataFromCSV(file, data)

    await deleteFiles('uploads')

    return res.status(200).json({
        message: 'The file was uploaded successfully',
    })
}

import { uploadFile } from '../../../src/controllers/fileController'
import type { Request, Response } from 'express'

jest.mock('../../../src/utils/file_utils', () => ({
    deleteFiles: jest.fn(),
    processDataFromCSV: jest.fn(),
}))

describe('uploadFile controller', () => {
    const mockRequest = (file: any): any => {
        const req: any = {}
        req.file = file
        return req as Request
    }

    const mockResponse = (): any => {
        const res: any = {}
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
        return res as Response
    }

    it('should return 500 if no file uploaded', async () => {
        const req: Request = mockRequest(undefined)
        const res: Response = mockResponse()

        await uploadFile(req, res)

        expect(res.json).toHaveBeenCalledWith({ message: 'No file uploaded' })
    })

    it('should return 200 if file uploaded successfully', async () => {
        const req: Request = mockRequest({ path: 'path' })
        const res: Response = mockResponse()

        await uploadFile(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: 'The file was uploaded successfully',
        })
    })
})

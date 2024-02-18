import { searchUsers } from '../../../src/controllers/usersController'
import type { Request, Response } from 'express'

const mockRequest = (query: any): any => ({
    query: { q: query },
})
const mockResponse = (): Response => {
    const res: any = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}

jest.mock('../../../src/data/csvData.ts', () => ({
    csvData: [
        {
            name: 'John Doe',
            city: 'New York',
            country: 'USA',
            favorite_sport: 'Basketball',
        },
        {
            name: 'Jane Smith',
            city: 'London',
            country: 'UK',
            favorite_sport: 'Football',
        },
    ],
}))

describe('searchUsers function', () => {
    const data = [
        {
            name: 'John Doe',
            city: 'New York',
            country: 'USA',
            favorite_sport: 'Basketball',
        },
        {
            name: 'Jane Smith',
            city: 'London',
            country: 'UK',
            favorite_sport: 'Football',
        },
    ]

    it('should return all users if query is empty', async () => {
        const req: Request = mockRequest('')
        const res: Response = mockResponse()

        await searchUsers(req, res)

        expect(res.json).toHaveBeenCalledWith({ data })
    })

    it('should return invalid message if query is invalid', async () => {
        const req: Request = mockRequest(1)
        const res: Response = mockResponse()

        await searchUsers(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: 'Invalid search query',
        })
    })

    it('should return filtered users based on the query', async () => {
        const req: Request = mockRequest('john')
        const res: Response = mockResponse()

        await searchUsers(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: [
                {
                    name: 'John Doe',
                    city: 'New York',
                    country: 'USA',
                    favorite_sport: 'Basketball',
                },
            ],
        })
    })

    it('should return empty array if no matching users found', async () => {
        const req: Request = mockRequest('marcos')
        const res: Response = mockResponse()

        await searchUsers(req, res)

        expect(res.json).toHaveBeenCalledWith({ data: [] })
    })
})

import * as fs from 'fs'
import { deleteFiles } from '../../../src/utils/file_utils'

jest.mock('fs', () => ({
    promises: {
        readdir: jest.fn(),
        unlink: jest.fn(),
    },
}))

describe('deleteFiles', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should delete all files in the directory', async () => {
        ;(fs.promises.readdir as jest.Mock).mockResolvedValue([
            'file1',
            'file2',
        ])
        await deleteFiles('testDirectory')
        expect(fs.promises.unlink).toHaveBeenCalledTimes(2)
        expect(fs.promises.unlink).toHaveBeenNthCalledWith(
            1,
            'testDirectory/file1'
        )
        expect(fs.promises.unlink).toHaveBeenNthCalledWith(
            2,
            'testDirectory/file2'
        )
    })

    it('should handle errors', async () => {
        const error = new Error('Test error')
        ;(fs.promises.readdir as jest.Mock).mockRejectedValue(error)
        console.error = jest.fn()
        await deleteFiles('testDirectory')
        expect(console.error).toHaveBeenCalledWith(
            'Error deleting files:',
            error
        )
    })
})

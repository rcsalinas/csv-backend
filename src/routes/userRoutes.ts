import express from 'express'
import { searchUsers } from '../controllers/usersController'

const router = express.Router()

router.get('/', (req, res, next) => {
    searchUsers(req, res).catch(next)
})

export default router

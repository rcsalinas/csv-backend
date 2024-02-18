import express from 'express'
import multer from 'multer'
import { uploadFile } from '../controllers/fileController'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.post('/', upload.single('file'), (req, res, next) => {
    uploadFile(req, res).catch(next)
})

export default router

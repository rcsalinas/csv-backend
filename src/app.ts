import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import usersRoutes from './routes/userRoutes'
import fileRoutes from './routes/fileRoutes'

const app = express()

// Middlewares
app.use(bodyParser.json())
app.use(cors())

app.get('/ping', (_req, res) => {
    res.send('pong')
})

// Routes
app.use('/api/users', usersRoutes)
app.use('/api/files', fileRoutes)

const PORT =
    process.env.PORT !== undefined && process.env.PORT !== ''
        ? process.env.PORT
        : 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

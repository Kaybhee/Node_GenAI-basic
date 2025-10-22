import dotenv from 'dotenv';
import express from 'express'
import router from './routes/route'

dotenv.config();
const PORT = process.env.PORT;

console.log(PORT)
const app = express()
app.use(express.json())
app.use('/api/', router)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
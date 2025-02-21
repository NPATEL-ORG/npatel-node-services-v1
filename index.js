import express, {json} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3302
const corsOption = { credential:true, origin:'*' }

app.use(cors({ corsOption }))
app.use(json())
app.use(cookieParser())
app.use('/', express.static(join(__dirname, 'public')))

app.listen(PORT, () => {})
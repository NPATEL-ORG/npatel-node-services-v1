import pg from 'pg'
import dotenv from'dotenv'

dotenv.config()
const { Pool } = pg

let devPoolConfig = {
    user: process.env.PDB_USER,
    password: process.env.PDB_PASSWORD,
    host: process.env.PDB_HOST,
    port: process.env.PDB_PORT,
    database: process.env.PDB_DB_NAME
}

const poolConfig = process.env.PDB_DB_URL ? {
    connectionString: process.env.PDB_DB_URL,
    ssl: {
      rejectUnauthorized: false
    }
  } : devPoolConfig

const pool = new Pool(poolConfig)

export default pool
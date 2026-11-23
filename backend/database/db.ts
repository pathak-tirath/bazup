import pg from 'pg'

const url = process.env.DATABASE_URL

if(!url) throw new Error("URL is not found!")

export const pool = new pg.Pool({
  connectionString: url,
  ssl: { rejectUnauthorized: true },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});


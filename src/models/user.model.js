// import pool from '../config/db'
import pool from "../config/db.js";

class UserModel {

  static async createTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(100),
        is_verified BOOLEAN DEFAULT FALSE,
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `;
    await pool.query(query)
  }

  // Find user by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  // Find user by username
  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0] || null;
  }

  // Create new user
  static async create(userData) {
    // const { username, email, password_hash, full_name } = userData;
    // const query = `
    //   INSERT INTO users (username, email, password_hash, full_name,created_at, updated_at)
    //   VALUES ($1, $2, $3, $4, NOW(), NOW())
    //   RETURNING id, username, email, full_name, created_at
    // `;
    // const result = await pool.query(query, [username, email, password_hash, full_name]);
     const { email,password_hash} = userData;
    const query = `
      INSERT INTO users (email,password_hash,created_at, updated_at)
      VALUES ($1,$2, NOW(), NOW())
      RETURNING id,email, created_at
    `;
    const result = await pool.query(query, [email,password_hash]);
    return result.rows[0];
  }

  // Update last login
  static async updateLastLogin(userId) {
    const query = 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1';
    await pool.query(query, [userId]);
  }


  static async updateLoginAttempts(email, attempts) {
    const lockUntil = attempts >= 5 ? new Date(Date.now() + 30 * 60 * 1000) : null; // lock 30 mins after 5 fails

    const query = `
    UPDATE users 
    SET login_attempts = $1,
        locked_until = $2,
        updated_at = NOW()
    WHERE email = $3
    RETURNING id, email, login_attempts, locked_until
  `;
    const result = await pool.query(query, [attempts, lockUntil, email]);
    return result.rows[0];
  }

  static async resetLoginAttempts(email) {
  //   const query = `
  //   UPDATE users
  //   SET login_attempts = 0,
  //       locked_until = NULL,
  //       last_login = NOW(),
  //       updated_at = NOW()
  //   WHERE email = $1
  //   RETURNING id, email, full_name, workspace_id, is_verified, last_login
  // `;
   const query = `
    UPDATE users
    SET login_attempts = 0,
        locked_until = NULL,
        last_login = NOW(),
        updated_at = NOW()
    WHERE email = $1
    RETURNING id, email, full_name, is_verified, last_login
  `;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }
}

export default UserModel


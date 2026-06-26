import pool from './src/config/db.js';

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW() as current_time, current_database() as database_name');
    console.log('✅ Database test successful:');
    console.log(`📊 Database: ${result.rows[0].database_name}`);
    console.log(`🕐 Server time: ${result.rows[0].current_time}`);
    await pool.end();
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  }
}

testConnection();
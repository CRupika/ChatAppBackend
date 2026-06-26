import dotenv from 'dotenv';
const result = dotenv.config();
import app from './src/app.js';

console.log("dotenv result:", result);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("typeof DB_PASSWORD:", typeof process.env.DB_PASSWORD);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



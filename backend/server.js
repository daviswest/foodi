const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, './.env') });
const express = require('express');
const cors = require('cors');
const restaurantRoutes = require('./routes/restaurantRoutes');
const locationRoutes = require('./routes/locationRoutes');



console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);
console.log('DEEPSEEK_API_KEY:', process.env.DEEPSEEK_API_KEY);
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.use('/api', restaurantRoutes);
app.use('/api', locationRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
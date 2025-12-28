const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes')
require('./models/db'); 
const app = express();
const taskRoutes = require('./routes/taskRoutes');


app.use(cors());
app.use(express.json());

app.use('/auth',authRoutes)
app.use('/tasks', taskRoutes);
app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

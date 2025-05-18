const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/notificationRoutes');
const { connectQueue } = require('./config/queue');  

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());




// Connect to MongoDB
connectDB();

// Routes
app.use('/api', notificationRoutes);   
app.use('/users', notificationRoutes); 

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectQueue();  
     app.use(cors());
    app.use('/api', notificationRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

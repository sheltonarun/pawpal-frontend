require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/users', userRoutes);

// Simple test route (backend-only)
app.get('/', (req, res) => {
  res.send('Pawpal backend is running!');
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('✅ MongoDB connected');
    app.listen(PORT, ()=> console.log(`🌐 Server running on ${PORT}`));
  })
  .catch(err=> console.error('❌ DB error:', err));

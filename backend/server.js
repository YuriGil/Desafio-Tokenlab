const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events'); // Adicionado
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Definir Rotas
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes); // Adicionado para corrigir erro 404

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
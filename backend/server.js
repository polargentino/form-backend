require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Configurar CORS para permitir solicitudes desde cualquier origen (o especificar un dominio si prefieres)
app.use(cors({
    origin: 'https://polargentino.github.io', // Permite solo solicitudes desde tu frontend
  }));
  
app.use(express.json());

// Conexión a MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Esquema y modelo para los formularios
const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Form = mongoose.model('Form', formSchema);

// Endpoint para recibir datos del formulario
app.post('/api/form', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const newForm = new Form({ name, email, message });
    await newForm.save();

    res.status(201).send('Form data saved');
  } catch (error) {
    console.error('Error al guardar el formulario:', error);
    res.status(500).json({ error: 'Ocurrió un error al guardar los datos.' });
  }
});

// Escuchar en el puerto asignado por Render o un puerto local
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

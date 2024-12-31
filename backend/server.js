require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Form = mongoose.model('Form', formSchema);

app.post('/api/form', async (req, res) => {
  const { name, email, message } = req.body;
  const newForm = new Form({ name, email, message });
  await newForm.save();
  res.send('Form data saved');
});

app.listen(5000, () => console.log('Server running on port 5000'));

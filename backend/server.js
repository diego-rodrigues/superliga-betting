require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const betSchema = new mongoose.Schema({
  user: String,
  prediction: String,
  points: Number,
});
const Bet = mongoose.model('Bet', betSchema);

app.get('/bets', async (req, res) => {
  const bets = await Bet.find();
  res.json(bets);
});

app.post('/bets', async (req, res) => {
  const newBet = new Bet(req.body);
  await newBet.save();
  res.json({ success: true });
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port 5000');
});

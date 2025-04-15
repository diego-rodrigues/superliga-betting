import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [bets, setBets] = useState([]);
  const [form, setForm] = useState({ user: '', prediction: '', points: 0 });

  useEffect(() => {
    axios.get('/api/bets').then((res) => setBets(res.data));
  }, []);

  const submit = () => {
    axios.post('/api/bets', form).then(() => {
      setBets([...bets, form]);
      setForm({ user: '', prediction: '', points: 0 });
    });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>🏆 Friends Betting App</h1>
      <input placeholder="User" value={form.user} onChange={(e) => setForm({ ...form, user: e.target.value })} />
      <input placeholder="Prediction" value={form.prediction} onChange={(e) => setForm({ ...form, prediction: e.target.value })} />
      <input type="number" value={form.points} onChange={(e) => setForm({ ...form, points: parseInt(e.target.value) })} />
      <button onClick={submit}>Place Bet</button>
      <ul>
        {bets.map((bet, idx) => (
          <li key={idx}>{bet.user}: {bet.prediction} ({bet.points} pts)</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

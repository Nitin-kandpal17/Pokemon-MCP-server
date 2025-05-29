import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    axios.get('http://localhost:8000/') // Adjust port if different
      .then((res) => {
        setMessage(res.data.message || 'Success!');
      })
      .catch((err) => {
        console.error(err);
        setMessage('Failed to connect to backend');
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Pokémon MCP Frontend</h1>
      <p>Backend Response: <strong>{message}</strong></p>
    </div>
  );
}

export default App;

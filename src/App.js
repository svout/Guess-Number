import React, { useState } from 'react';

function App() {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = async () => {
    await fetch('/start_game', { method: 'POST' });
    setGameStarted(true);
    setMessage('');
    setNumber('');
  };

  const handleGuess = async () => {
    const response = await fetch('/guess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guess: parseInt(number) }),
    });

    const result = await response.json();
    setMessage(result.message);

    if (result.message === 'Число вгадано') {
      setGameStarted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-5">
      <h1 className="text-3xl font-bold text-center mb-8">Вгадай число</h1>
      {gameStarted ? (
        <div className="w-full max-w-xs">
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Введіть число"
          />
          <button
            onClick={handleGuess}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Відправити
          </button>
          <p className="mt-4 text-center text-xl">{message}</p>
        </div>
      ) : (
        <button
          onClick={startGame}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
        >
          Почати гру
        </button>
      )}
    </div>
  );
}

export default App;

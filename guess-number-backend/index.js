const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let randomNumber;

app.post('/start_game', (req, res) => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log(`Загадане число: ${randomNumber}`);
  res.status(200).send({ message: 'Гру розпочато' });
});

app.post('/guess', (req, res) => {
  const { guess } = req.body;
  let message = '';

  if (guess > randomNumber) {
    message = 'Загадане число меньше';
  } else if (guess < randomNumber) {
    message = 'Загадане число більше';
  } else {
    message = 'Число вгадано';
  }

  res.status(200).send({ message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Сервер запущено на порті ${PORT}`));

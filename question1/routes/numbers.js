import express from 'express';
import axios from 'axios';
const router = express.Router();

let evenWindow = [];

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3ODk1NDY4LCJpYXQiOjE3NDc4OTUxNjgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijg3YzdjOGU4LWI0YzAtNDY5My04NmE4LWFmMjBlZDAxMjczYyIsInN1YiI6IjIyMDAwMzAzMjZjc2VoQGdtYWlsLmNvbSJ9LCJlbWFpbCI6IjIyMDAwMzAzMjZjc2VoQGdtYWlsLmNvbSIsIm5hbWUiOiJsYWtzaG1hbmEgc3dhbXkiLCJyb2xsTm8iOiIyMjAwMDMwMzI2IiwiYWNjZXNzQ29kZSI6ImJlVEpqSiIsImNsaWVudElEIjoiODdjN2M4ZTgtYjRjMC00NjkzLTg2YTgtYWYyMGVkMDEyNzNjIiwiY2xpZW50U2VjcmV0IjoiakJUWnNKdW13eXhrclFXWCJ9.HGF5Q20AfHumvR2uU0m4RrVqhn7QLWMS5tocD4_DmiI';

// EVEN NUMBERS
router.get('/e', async (req, res) => {
  try {
    const response = await axios.get('http://20.244.56.144/evaluation-service/even', {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
    });
    console.log(response.data); // Log the response data
    const numbers = response.data.numbers || response.data.even || [];
    const windowPrevState = [...evenWindow];
    evenWindow = [...evenWindow, ...numbers].slice(-10);
    const avg = numbers.length ? (numbers.reduce((a, b) => a + b, 0) / numbers.length) : 0;
    res.json({
      windowPrevState,
      windowCurrState: evenWindow,
      numbers,
      avg: Number(avg.toFixed(2))
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch even numbers' });
  }
});

// Prime Numbers API
router.get('/p', (req, res) => {
  const primes = [];
  for (let i = 2; i <= 100; i++) {
    if (isPrime(i)) primes.push(i);
  }
  res.json({ primes });
});

function isPrime(num) {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}

// Fibonacci Numbers API:
router.get('/f', (req, res) => {
  const fib = [0, 1];
  for (let i = 2; i < 20; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  res.json({ fibonacci: fib });
});

// Random Numbers API: 
router.get('/r', (req, res) => {
  const random = [];
  for (let i = 0; i < 10; i++) {
    random.push(Math.floor(Math.random() * 100));
  }
  res.json({ random });
});

export default router;
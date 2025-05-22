export function calculateAverage(req, res) {
  const { numbers } = req.body;
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'Numbers array is required.' });
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const avg = sum / numbers.length;
  res.json({ average: avg });
}
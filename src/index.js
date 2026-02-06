import express from 'express';
import reminderRoutes from './routes/reminderRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/reminders', reminderRoutes)

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})
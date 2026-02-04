import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/reminders', (req, res) => {
    res.send('Get all reminders')
}) 

app.get('/reminders/:id', (req, res) => {
    res.send('Get single reminder by id')
}) 

app.post('/reminders', (req, res) => {
    res.send('create a new reminder')
}) 

app.patch('/reminders/:id', (req, res) => {
    res.send('update a reminder')
}) 

app.delete('/reminders', (req, res) => {
    res.send('delete a reminder')
}) 

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})
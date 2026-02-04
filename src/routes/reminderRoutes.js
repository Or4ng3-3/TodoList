import { Router } from 'express'

const router = Router();

router.get('/', (req, res) => {
    res.send('Get all reminders')
}) 

router.get('/:id', (req, res) => {
    res.send('Get single reminder by id')
}) 

router.post('/', (req, res) => {
    res.send('create a new reminder')
}) 

router.patch('/:id', (req, res) => {
    res.send('update a reminder')
}) 

router.delete('/:id', (req, res) => {
    res.send('delete a reminder')
}) 

export default router;
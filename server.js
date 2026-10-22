require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

const GymLeader = mongoose.model('GymLeader', new mongoose.Schema({
    name:      { type: String, required: true, minlength: 2 },
    region:    { type: String, required: true, enum: ['Kanto', 'Johto', 'Hoenn'] },
    town:      { type: String, required: true },
    badge:     { type: String, required: true },
    specialty: { type: String, required: true },
    aceLevel:  {
        type: Number, required: true, min: 1, max: 100,
        validate: { validator: Number.isInteger, message: 'aceLevel must be a whole number!' }
    },
    motto:     { type: String, maxlength: 150 }
}));

app.get('/api/leaders', async (req, res) => {
    try {
        const leaders = await GymLeader.find();
        res.status(200).json(leaders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch leaders' });
    }
});

app.get('/api/leaders/:id', async (req, res) => {
    try {
        const leader = await GymLeader.findById(req.params.id);
        if (!leader) return res.status(404).json({ error: 'Leader not found' });
        res.status(200).json(leader);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({ error: 'Leader not found' });
        }
        res.status(500).json({ error: 'Failed to fetch leader' });
    }
});

app.post('/api/leaders', async (req, res) => {
    try {
        const leader = await GymLeader.create(req.body);
        res.status(201).json(leader);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Failed to create leader' });
    }
});

app.put('/api/leaders/:id', async (req, res) => {
    try {
        const leader = await GymLeader.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true, overwrite: true }
        );
        if (!leader) return res.status(404).json({ error: 'Leader not found' });
        res.status(200).json(leader);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        if (err.name === 'CastError') {
            return res.status(404).json({ error: 'Leader not found' });
        }
        res.status(500).json({ error: 'Failed to update leader' });
    }
});

app.delete('/api/leaders/:id', async (req, res) => {
    try {
        const leader = await GymLeader.findByIdAndDelete(req.params.id);
        if (!leader) return res.status(404).json({ error: 'Leader not found' });
        res.status(200).json({ message: 'Successfully deleted leader' });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({ error: 'Leader not found' });
        }
        res.status(500).json({ error: 'Failed to delete leader' });
    }
});
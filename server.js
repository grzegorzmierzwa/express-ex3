const express = require('express');
const app = express();
let db = require('./db');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors());


app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.testimonials.find(item => item.id == req.params.id));
});

app.get('/testimonials/random', (req, res) => {
    res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

app.post('/testimonials', (req, res) => {
    const {author, text} = req.body;
    console.log(req.body);
    const id = db.testimonials.length + 1;

    db.testimonials.push({id, author, text});

    res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
    const testimonials = db.testimonials.find(item => item.id == req.params.id);

    if (!testimonials) {
        res.status(404).json({message: 'Not found' });
        return;
    }

    testimonials.author = req.body.author;
    testimonials.text = req.body.text;
    
    res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
    db.testimonials = db.testimonials.filter((item) => item.id != req.params.id);

    res.json({ message: 'OK' });
});


app.get('/concerts', (req, res) => {
    res.json(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
    res.json(db.concerts.find(item => item.id == req.params.id));
});


app.post('/concerts', (req, res) => {
    const { performer, genre, price, day, info } = req.body;
    const id = db.concerts.length + 1;

    db.concerts.push({ id, performer, genre, price, day, info });

    res.json({ message: 'OK' });
});

app.put('/concerts/:id', (req, res) => {
    const concerts = db.concerts.find(item => item.id == req.params.id);

    if (!concerts) {
        res.status(404).json({message: 'Not found' });
        return;
    }

    concerts.performer = req.body.performer;
    concerts.genre = req.body.genre;
    concerts.price = req.body.price;
    concerts.day = req.body.day;
    concerts.info = req.body.info;
    
    res.json({ message: 'OK' });
});

app.delete('/concerts/:id', (req, res) => {
    db.concerts = db.concerts.filter((item) => item.id != req.params.id);

    res.json({ message: 'OK' });
});


app.get('/seats', (req, res) => {
    res.json(db.seats);
});

app.get('/seats/:id', (req, res) => {
    res.json(db.seats.find(item => item.id == req.params.id));
});


app.post('/seats', (req, res) => {
    const { day, seat, client, email } = req.body;
    const id = db.seats.length + 1;

    db.seats.push({ id, day, seat, client, email });

    res.json({ message: 'OK' });
});

app.put('/seats/:id', (req, res) => {
    const seats = db.seats.find(item => item.id == req.params.id);

    if (!seats) {
        res.status(404).json({message: 'Not found' });
        return;
    }

    seats.day = req.body.day;
    seats.seat = req.body.seat;
    seats.client = req.body.client;
    seats.email = req.body.email;
    
    res.json({ message: 'OK' });
});

app.delete('/seats/:id', (req, res) => {
    db.seats = db.seats.filter((item) => item.id != req.params.id);

    res.json({ message: 'OK' });
});


app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
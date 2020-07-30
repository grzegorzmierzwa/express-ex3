const express = require('express');
const app = express();
const db= require('./db');

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
    const testimonial = db.testimonials.find(item => item.id == req.params.id);

    if (!testimonial) {
        res.status(404).json({message: 'Not found' });
        return;
    }

    testimonial.author = req.body.author;
    testimonial.text = req.body.text;
    
    res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
    db = db.testimonials.filter((item) => item.id != req.params.id);

    res.json({ message: 'OK' });
});



app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors());

let db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 3, author: 'Greg Doe', text: 'This company is worth every coin!' },
    { id: 4, author: 'Tom Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
    res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.find(item => item.id == req.params.id));

});

app.get('/testimonials/random', (req, res) => {
    res.json(db[Math.floor(Math.random() * db.length)]);
});

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
    console.log(req.body);
    const id = db.length + 1;

    db.push({ id, author, text });

    res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
    const testimonial = db.find(item => item.id == req.params.id);

    if (!testimonial) {
        res.status(404).json({ message: 'Not found' });
        return;
    }

    testimonial.author = req.body.author;
    testimonial.text = req.body.text;

    res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
    db = db.filter((item) => item.id != req.params.id);

    res.json({ message: 'OK' });
});



app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
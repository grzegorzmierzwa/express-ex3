const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors());


const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 3, author: 'Greg Doe', text: 'This company is worth every coin!' },
    { id: 4, author: 'Tom Doe', text: 'They really know how to make you happy.' },
  ];

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
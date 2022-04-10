const express = require('express');
const db = require('./db/connect');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(404).end();
});

db.connect(err => {
    if (err) throw err;
    console.log('database connected');
    app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`);
    });
});
